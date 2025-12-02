import { Page, expect } from '@playwright/test';
import type { TEST_USERS } from '../fixtures/test-data';

/**
 * Page Object Model for Login page
 * Handles authentication flow with robust locators and improved async patterns
 */
export class LoginPage {
  // Robust locators using multiple strategies
  private readonly emailInput = this.page.getByRole('textbox', { name: /email/i }).or(this.page.locator('[data-testid="email-input"]')).or(this.page.locator('input[type="email"]'));
  private readonly passwordInput = this.page.getByLabel(/password/i).or(this.page.locator('[data-testid="password-input"]')).or(this.page.locator('input[type="password"]'));
  private readonly submitButton = this.page.getByRole('button', { name: /sign in/i }).or(this.page.locator('[data-testid="submit-btn"]'));
  private readonly pageTitle = this.page.getByRole('heading', { name: /sign in/i }).or(this.page.locator('h1'));
  private readonly errorMessages = this.page.locator('[role="alert"]').or(this.page.locator('[data-testid="error-message"]')).or(this.page.locator('.error-message'));

  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto('/login');
    await this.expectPageLoaded();
  }

  /**
   * Fill login form with credentials
   * @param email User email address
   * @param password User password
   */
  async fillCredentials(email: string, password: string) {
    await Promise.all([
      this.emailInput.fill(email),
      this.passwordInput.fill(password)
    ]);
  }

  /**
   * Fill credentials using test user data
   */
  async fillCredentialsFromData(user: typeof TEST_USERS[keyof typeof TEST_USERS]) {
    await this.fillCredentials(user.email, user.password);
  }

  async submitLogin() {
    await this.submitButton.click();
  }

  /**
   * Complete login flow with provided credentials
   * @param email User email address  
   * @param password User password
   */
  async login(email: string, password: string) {
    await this.fillCredentials(email, password);
    await this.submitLogin();
  }

  /**
   * Login using test user data
   */
  async loginWithTestUser(user: typeof TEST_USERS[keyof typeof TEST_USERS]) {
    await this.login(user.email, user.password);
  }

  async expectPageLoaded() {
    await Promise.all([
      expect(this.pageTitle).toBeVisible(),
      expect(this.emailInput).toBeVisible(),
      expect(this.passwordInput).toBeVisible(),
      expect(this.submitButton).toBeVisible()
    ]);
  }

  /**
   * Verify validation errors with improved async handling
   * @param errors Expected error messages
   */
  async expectValidationErrors(errors: string[]) {
    await Promise.all(
      errors.map(error => {
        // Try multiple approaches to find error messages
        const errorLocator = this.page.getByText(error, { exact: false })
          .or(this.errorMessages.filter({ hasText: error }))
          .or(this.page.locator(`[aria-describedby*="error"]:has-text("${error}")`))
          .first();
        return expect(errorLocator).toBeVisible();
      })
    );
  }

  /**
   * Verify successful redirection after login
   * @param expectedUrl Expected URL after successful login
   */
  async expectRedirection(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  /**
   * Wait for and verify no validation errors are present
   */
  async expectNoValidationErrors() {
    await expect(this.errorMessages).not.toBeVisible();
  }

  /**
   * Get current form values for debugging
   */
  async getFormValues() {
    const [email] = await Promise.all([
      this.emailInput.inputValue(),
      this.passwordInput.inputValue()
    ]);
    return { email, password: '***' }; // Don't expose password in logs
  }
}