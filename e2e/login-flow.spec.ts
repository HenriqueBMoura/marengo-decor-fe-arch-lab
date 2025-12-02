import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login-page';
import { BudgetPage } from './page-objects/budget-page';
import { TEST_USERS, TEST_VALIDATION_MESSAGES } from './fixtures/test-data';

test.describe('Login Flow', () => {
  let loginPage: LoginPage;
  let budgetPage: BudgetPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    budgetPage = new BudgetPage(page);
    await loginPage.goto();
  });

  test('should display login form correctly', async () => {
    await loginPage.expectPageLoaded();
  });

  test('should redirect to budget after successful login', async () => {
    await loginPage.loginWithTestUser(TEST_USERS.VALID_USER);
    
    await loginPage.expectRedirection('/budget');
    await budgetPage.expectPageLoaded();
  });

  test('should validate invalid email format', async () => {
    await loginPage.fillCredentialsFromData(TEST_USERS.INVALID_EMAIL);
    await loginPage.submitLogin();
    
    await loginPage.expectValidationErrors([TEST_VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT]);
  });

  test('should require password field', async () => {
    await loginPage.fillCredentialsFromData(TEST_USERS.MISSING_PASSWORD);
    await loginPage.submitLogin();
    
    await loginPage.expectValidationErrors([TEST_VALIDATION_MESSAGES.PASSWORD.REQUIRED]);
  });

  test('should require email field when empty', async () => {
    await loginPage.fillCredentials('', 'password123');
    await loginPage.submitLogin();
    
    await loginPage.expectValidationErrors([TEST_VALIDATION_MESSAGES.EMAIL.REQUIRED]);
  });

  test('should handle multiple validation errors', async () => {
    // Submit form with no data
    await loginPage.submitLogin();
    
    await loginPage.expectValidationErrors([
      TEST_VALIDATION_MESSAGES.EMAIL.REQUIRED,
      TEST_VALIDATION_MESSAGES.PASSWORD.REQUIRED
    ]);
  });

  test('should clear validation errors when form is corrected', async () => {
    // First trigger validation errors
    await loginPage.submitLogin();
    await loginPage.expectValidationErrors([TEST_VALIDATION_MESSAGES.EMAIL.REQUIRED]);

    // Then fill form correctly
    await loginPage.fillCredentialsFromData(TEST_USERS.VALID_USER);
    
    // Validation errors should be cleared
    await loginPage.expectNoValidationErrors();
  });

  test('should preserve form state during validation', async () => {
    const testEmail = 'test@example.com';
    
    await loginPage.fillCredentials(testEmail, '');
    await loginPage.submitLogin();
    
    // Email should be preserved after validation error
    const formValues = await loginPage.getFormValues();
    expect(formValues.email).toBe(testEmail);
  });

  test('should handle login with different valid credentials', async ({ page }) => {
    const users = [
      { email: 'admin@example.com', password: 'admin123' },
      { email: 'user@test.com', password: 'user123' },
      { email: 'demo@demo.com', password: 'demo123' }
    ];

    for (const user of users) {
      await page.reload();
      await loginPage.expectPageLoaded();
      
      await loginPage.login(user.email, user.password);
      
      // Should redirect to budget page for any valid user
      await loginPage.expectRedirection('/budget');
      
      // Navigate back to login for next iteration
      if (users.indexOf(user) < users.length - 1) {
        await loginPage.goto();
      }
    }
  });

  test('should handle authentication errors gracefully', async () => {
    await loginPage.fillCredentials('wrong@email.com', 'wrongpassword');
    await loginPage.submitLogin();
    
    // Should either show error message or stay on login page
    const currentUrl = await loginPage.page.url();
    expect(currentUrl).toContain('/login');
  });
});