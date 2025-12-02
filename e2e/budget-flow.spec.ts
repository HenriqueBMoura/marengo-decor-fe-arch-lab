import { test, expect } from '@playwright/test';
import { BudgetPage } from './page-objects/budget-page';
import { TEST_CALCULATIONS, TEST_MATERIALS, TEST_DIMENSIONS, TEST_VALIDATION_MESSAGES } from './fixtures/test-data';

test.describe('Budget Calculator', () => {
  let budgetPage: BudgetPage;

  test.beforeEach(async ({ page }) => {
    budgetPage = new BudgetPage(page);
    await budgetPage.goto();
  });

  test('should calculate blackout estimate correctly', async () => {
    const testData = TEST_CALCULATIONS.BLACKOUT_MEDIUM;
    
    await budgetPage.fillDimensionsFromData(testData);
    await budgetPage.selectMaterialFromData(TEST_MATERIALS.BLACKOUT);
    await budgetPage.calculate();

    await budgetPage.expectEstimateFromData(testData);
  });

  test('should calculate linho estimate correctly', async () => {
    const testData = TEST_CALCULATIONS.LINHO_LARGE;
    
    await budgetPage.fillDimensionsFromData(testData);
    await budgetPage.selectMaterialFromData(TEST_MATERIALS.LINHO);
    await budgetPage.calculate();

    await budgetPage.expectEstimateFromData(testData);
  });

  test('should calculate persiana estimate correctly', async () => {
    const testData = TEST_CALCULATIONS.PERSIANA_SMALL;
    
    await budgetPage.fillDimensionsFromData(testData);
    await budgetPage.selectMaterialFromData(TEST_MATERIALS.PERSIANA_PVC);
    await budgetPage.calculate();

    await budgetPage.expectEstimateFromData(testData);
  });

  test('should clear form correctly', async () => {
    const testData = TEST_CALCULATIONS.BLACKOUT_MEDIUM;
    
    await budgetPage.fillDimensionsFromData(testData);
    await budgetPage.selectMaterialFromData(TEST_MATERIALS.BLACKOUT);
    
    await budgetPage.clearForm();
    await budgetPage.expectEmptyForm();
  });

  test('should validate required width field', async () => {
    await budgetPage.fillDimensions(TEST_DIMENSIONS.INVALID.ZERO_WIDTH.width, TEST_DIMENSIONS.INVALID.ZERO_WIDTH.height);
    await budgetPage.selectMaterialFromData(TEST_MATERIALS.BLACKOUT);
    await budgetPage.calculate();

    await budgetPage.expectValidationErrors([TEST_VALIDATION_MESSAGES.REQUIRED_FIELDS.WIDTH]);
  });

  test('should validate required height field', async () => {
    await budgetPage.fillDimensions(TEST_DIMENSIONS.INVALID.ZERO_HEIGHT.width, TEST_DIMENSIONS.INVALID.ZERO_HEIGHT.height);
    await budgetPage.selectMaterialFromData(TEST_MATERIALS.BLACKOUT);
    await budgetPage.calculate();

    await budgetPage.expectValidationErrors([TEST_VALIDATION_MESSAGES.REQUIRED_FIELDS.HEIGHT]);
  });

  test('should validate both width and height when empty', async () => {
    await budgetPage.fillDimensions(TEST_DIMENSIONS.INVALID.EMPTY.width, TEST_DIMENSIONS.INVALID.EMPTY.height);
    await budgetPage.calculate();

    await budgetPage.expectValidationErrors([
      TEST_VALIDATION_MESSAGES.REQUIRED_FIELDS.WIDTH,
      TEST_VALIDATION_MESSAGES.REQUIRED_FIELDS.HEIGHT
    ]);
  });

  test('should handle different material selections correctly', async () => {
    const materials = [
      { material: TEST_MATERIALS.BLACKOUT, calculation: TEST_CALCULATIONS.BLACKOUT_MEDIUM },
      { material: TEST_MATERIALS.LINHO, calculation: TEST_CALCULATIONS.LINHO_LARGE },
      { material: TEST_MATERIALS.PERSIANA_PVC, calculation: TEST_CALCULATIONS.PERSIANA_SMALL }
    ];

    for (const { material, calculation } of materials) {
      await budgetPage.fillDimensionsFromData(calculation);
      await budgetPage.selectMaterialFromData(material);
      await budgetPage.calculate();
      
      await budgetPage.expectEstimateFromData(calculation);
      
      // Clear form for next iteration
      await budgetPage.clearForm();
    }
  });

  test('should handle negative dimensions validation', async () => {
    await budgetPage.fillDimensions(TEST_DIMENSIONS.INVALID.NEGATIVE.width, TEST_DIMENSIONS.INVALID.NEGATIVE.height);
    await budgetPage.selectMaterialFromData(TEST_MATERIALS.BLACKOUT);
    await budgetPage.calculate();

    await budgetPage.expectValidationErrors([TEST_VALIDATION_MESSAGES.REQUIRED_FIELDS.WIDTH]);
  });

  test('should preserve form state during validation errors', async () => {
    await budgetPage.fillDimensions('', TEST_DIMENSIONS.VALID.MEDIUM.height);
    await budgetPage.selectMaterialFromData(TEST_MATERIALS.BLACKOUT);
    await budgetPage.calculate();

    // Form should preserve valid values
    const formValues = await budgetPage.getFormValues();
    expect(formValues.height).toBe(TEST_DIMENSIONS.VALID.MEDIUM.height);
    expect(formValues.material).toBe(TEST_MATERIALS.BLACKOUT.id);
  });
});