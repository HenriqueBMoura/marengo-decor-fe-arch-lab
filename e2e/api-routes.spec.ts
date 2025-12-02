import { test, expect } from '@playwright/test';
import { TEST_CALCULATIONS, TEST_MATERIALS, TEST_VALIDATION_MESSAGES } from './fixtures/test-data';

test.describe('API Routes', () => {
  test('POST /api/calculate should return correct blackout calculation', async ({ request }) => {
    const testData = TEST_CALCULATIONS.BLACKOUT_MEDIUM;
    
    const response = await request.post('/api/calculate', {
      data: {
        widthCm: testData.width,
        heightCm: testData.height,
        materialId: testData.material
      }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    expect(data).toMatchObject({
      materialName: TEST_MATERIALS.BLACKOUT.name,
      areaM2: testData.expected.area,
      pricePerM2: testData.expected.pricePerM2,
      total: testData.expected.total
    });
  });

  test('POST /api/calculate should return correct linho calculation', async ({ request }) => {
    const testData = TEST_CALCULATIONS.LINHO_LARGE;
    
    const response = await request.post('/api/calculate', {
      data: {
        widthCm: testData.width,
        heightCm: testData.height,
        materialId: testData.material
      }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    expect(data).toMatchObject({
      materialName: TEST_MATERIALS.LINHO.name,
      areaM2: testData.expected.area,
      pricePerM2: testData.expected.pricePerM2,
      total: testData.expected.total
    });
  });

  test('POST /api/calculate should validate required fields', async ({ request }) => {
    const response = await request.post('/api/calculate', {
      data: {
        widthCm: 0,
        heightCm: 150
        // missing materialId
      }
    });

    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.message).toMatch(TEST_VALIDATION_MESSAGES.API.INVALID_PARAMETERS);
  });

  test('POST /api/calculate should handle invalid material ID', async ({ request }) => {
    const response = await request.post('/api/calculate', {
      data: {
        widthCm: 200,
        heightCm: 150,
        materialId: 'non-existent-material'
      }
    });

    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.message).toMatch(TEST_VALIDATION_MESSAGES.API.MATERIAL_NOT_FOUND);
  });

  test('POST /api/calculate should handle all material types correctly', async ({ request }) => {
    const testCases = [
      {
        calculation: TEST_CALCULATIONS.BLACKOUT_MEDIUM,
        material: TEST_MATERIALS.BLACKOUT
      },
      {
        calculation: TEST_CALCULATIONS.LINHO_LARGE,
        material: TEST_MATERIALS.LINHO
      },
      {
        calculation: TEST_CALCULATIONS.PERSIANA_SMALL,
        material: TEST_MATERIALS.PERSIANA_PVC
      }
    ];

    for (const { calculation, material } of testCases) {
      const response = await request.post('/api/calculate', {
        data: {
          widthCm: calculation.width,
          heightCm: calculation.height,
          materialId: material.id
        }
      });

      // Better error handling
      if (!response.ok()) {
        const errorData = await response.text();
        console.error(`API Error for material ${material.id}:`, response.status(), errorData);
      }

      expect(response.ok()).toBeTruthy();
      const data = await response.json();
      
      expect(data.materialName).toBe(material.name);
      expect(data.pricePerM2).toBe(material.pricePerM2);
      expect(data.areaM2).toBe(calculation.expected.area);
      expect(data.total).toBe(calculation.expected.total);
    }
  });

  test('POST /api/calculate should handle boundary values', async ({ request }) => {
    // Test with very small dimensions - API rounds to 0
    const smallResponse = await request.post('/api/calculate', {
      data: {
        widthCm: 1,
        heightCm: 1,
        materialId: TEST_MATERIALS.BLACKOUT.id
      }
    });

    if (smallResponse.ok()) {
      const smallData = await smallResponse.json();
      // API: 1cm x 1cm = 0.0001m² → rounds to 0.00 for display
      expect(smallData.areaM2).toBe(0); // Rounded for display
      // But total uses original area: 0.0001 * 120 = 0.012 → 0.01
      expect(smallData.total).toBe(0.01); // Uses unrounded area for calculation
    } else {
      // Should return validation error for too small dimensions
      expect(smallResponse.status()).toBe(400);
    }

    // Test with minimum meaningful dimensions
    const validResponse = await request.post('/api/calculate', {
      data: {
        widthCm: 10,
        heightCm: 10,
        materialId: TEST_MATERIALS.BLACKOUT.id
      }
    });

    expect(validResponse.ok()).toBeTruthy();
    const validData = await validResponse.json();
    expect(validData.areaM2).toBe(0.01); // 10cm x 10cm = 0.01m²
    expect(validData.total).toBe(1.2); // 0.01 * 120 = 1.2
  });

  test('POST /api/calculate should validate material exists', async ({ request }) => {
    // Test with invalid but non-empty material ID
    const response = await request.post('/api/calculate', {
      data: {
        widthCm: 200,
        heightCm: 150,
        materialId: 'invalid-material-id'
      }
    });

    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.message).toMatch(TEST_VALIDATION_MESSAGES.API.MATERIAL_NOT_FOUND);
  });

  test('POST /api/calculate should validate required materialId parameter', async ({ request }) => {
    const invalidMaterials = ['', null, undefined];

    for (const invalidMaterial of invalidMaterials) {
      const response = await request.post('/api/calculate', {
        data: {
          widthCm: 200,
          heightCm: 150,
          materialId: invalidMaterial
        }
      });

      expect(response.status()).toBe(400);
      const data = await response.json();
      // These will be caught by general parameter validation
      expect(data.message).toMatch(TEST_VALIDATION_MESSAGES.API.INVALID_PARAMETERS);
    }
  });
});