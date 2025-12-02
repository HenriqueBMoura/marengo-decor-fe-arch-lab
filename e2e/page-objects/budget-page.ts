import { Page, expect } from '@playwright/test';
import type { TEST_CALCULATIONS, TEST_MATERIALS } from '../fixtures/test-data';

/**
 * Page Object Model for Budget Calculator
 * Handles estimation workflow and form interactions
 */
export class BudgetPage {
  // Robust locators using multiple strategies
  private readonly widthInput = this.page.getByRole('textbox', { name: /width/i }).or(this.page.locator('[data-testid="width-input"]')).or(this.page.locator('input[placeholder*="250"]'));
  private readonly heightInput = this.page.getByRole('textbox', { name: /height/i }).or(this.page.locator('[data-testid="height-input"]')).or(this.page.locator('input[placeholder*="260"]'));
  private readonly materialSelect = this.page.getByRole('combobox', { name: /material/i }).or(this.page.locator('[data-testid="material-select"]')).or(this.page.locator('select'));
  private readonly calculateButton = this.page.getByRole('button', { name: /calculate/i }).or(this.page.locator('[data-testid="calculate-btn"]'));
  private readonly clearButton = this.page.getByRole('button', { name: /clear/i }).or(this.page.locator('[data-testid="clear-btn"]'));
  private readonly estimateSummary = this.page.getByRole('heading', { name: /estimate summary/i }).or(this.page.locator('[data-testid="estimate-summary"]'));
  private readonly totalPrice = this.page.locator('[data-testid="total-price"]').or(this.page.locator('text=/R\$ [\d,]+\.\d{2}/'));
  private readonly pageTitle = this.page.getByRole('heading', { name: /estimate your project/i }).or(this.page.locator('h1'));

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/budget');
    await this.expectPageLoaded();
  }

  /**
   * Fill project dimensions
   * @param width Width in centimeters
   * @param height Height in centimeters
   */
  async fillDimensions(width: string, height: string) {
    await this.widthInput.fill(width);
    await this.heightInput.fill(height);
  }

  /**
   * Fill dimensions using test calculation data
   */
  async fillDimensionsFromData(calculation: typeof TEST_CALCULATIONS[keyof typeof TEST_CALCULATIONS]) {
    await this.fillDimensions(calculation.width.toString(), calculation.height.toString());
  }

  /**
   * Select material type
   * @param materialId Material identifier (blackout, sheer, cotton)
   */
  async selectMaterial(materialId: string) {
    await this.materialSelect.selectOption(materialId);
  }

  /**
   * Select material using test data
   */
  async selectMaterialFromData(material: typeof TEST_MATERIALS[keyof typeof TEST_MATERIALS]) {
    await this.selectMaterial(material.id);
  }

  async calculate() {
    await this.calculateButton.click();
  }

  async clearForm() {
    await this.clearButton.click();
  }

  /**
   * Verify estimation meets business requirements
   * @param total Expected formatted price (e.g., "R$ 360.00")
   */
  async expectEstimate(total: string) {
    await expect(this.estimateSummary).toBeVisible();
    await expect(this.totalPrice).toContainText(total);
  }

  /**
   * Verify estimation using test calculation data
   */
  async expectEstimateFromData(calculation: typeof TEST_CALCULATIONS[keyof typeof TEST_CALCULATIONS]) {
    await this.expectEstimate(`R$ ${calculation.expected.total.toFixed(2)}`);
  }

  async expectEmptyForm() {
    await Promise.all([
      expect(this.widthInput).toHaveValue(''),
      expect(this.heightInput).toHaveValue('')
    ]);
  }

  /**
   * Verify validation error display with improved async handling
   * @param errors Expected error messages
   */
  async expectValidationErrors(errors: string[]) {
    await Promise.all(
      errors.map(error => 
        expect(this.page.getByText(error, { exact: false })).toBeVisible()
      )
    );
  }

  async expectPageLoaded() {
    await Promise.all([
      expect(this.pageTitle).toBeVisible(),
      expect(this.widthInput).toBeVisible(),
      expect(this.heightInput).toBeVisible(),
      expect(this.materialSelect).toBeVisible(),
      expect(this.calculateButton).toBeVisible()
    ]);
  }

  /**
   * Get current form values for debugging
   */
  async getFormValues() {
    const [width, height, material] = await Promise.all([
      this.widthInput.inputValue(),
      this.heightInput.inputValue(), 
      this.materialSelect.inputValue()
    ]);
    return { width, height, material };
  }
}