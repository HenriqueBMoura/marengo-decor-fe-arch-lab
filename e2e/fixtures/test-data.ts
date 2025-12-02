/**
 * Test data fixtures for E2E tests
 * Centralized test data management for consistency and maintainability
 */

export const TEST_MATERIALS = {
  BLACKOUT: {
    id: 'blackout',
    name: 'Tecido Blackout',
    pricePerM2: 120
  },
  LINHO: {
    id: 'linho', 
    name: 'Tecido Linho',
    pricePerM2: 90
  },
  PERSIANA_PVC: {
    id: 'persiana-pvc',
    name: 'Persiana PVC',
    pricePerM2: 150
  }
} as const;export const TEST_CALCULATIONS = {
  BLACKOUT_MEDIUM: {
    width: 200,
    height: 150, 
    material: TEST_MATERIALS.BLACKOUT.id,
    expected: {
      area: 3, // (200 * 150) / 10000
      pricePerM2: TEST_MATERIALS.BLACKOUT.pricePerM2,
      total: 360 // 3 * 120
    }
  },
  LINHO_LARGE: {
    width: 300,
    height: 200,
    material: TEST_MATERIALS.LINHO.id,
    expected: {
      area: 6, // (300 * 200) / 10000
      pricePerM2: TEST_MATERIALS.LINHO.pricePerM2,
      total: 540 // 6 * 90
    }
  },
  PERSIANA_SMALL: {
    width: 100,
    height: 100,
    material: TEST_MATERIALS.PERSIANA_PVC.id,
    expected: {
      area: 1, // (100 * 100) / 10000
      pricePerM2: TEST_MATERIALS.PERSIANA_PVC.pricePerM2,
      total: 150 // 1 * 150
    }
  }
} as const;

export const TEST_USERS = {
  VALID_USER: {
    email: 'test@example.com',
    password: 'password123'
  },
  INVALID_EMAIL: {
    email: 'invalid-email-format',
    password: 'password123'
  },
  MISSING_PASSWORD: {
    email: 'test@example.com',
    password: ''
  }
} as const;

export const TEST_VALIDATION_MESSAGES = {
  REQUIRED_FIELDS: {
    WIDTH: 'Width is required',
    HEIGHT: 'Height is required',
    MATERIAL: 'Material selection is required'
  },
  EMAIL: {
    INVALID_FORMAT: 'Please enter a valid email',
    REQUIRED: 'Email is required'
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    TOO_SHORT: 'Password must be at least 6 characters'
  },
  API: {
    INVALID_PARAMETERS: /Invalid parameters|Parâmetros inválidos/,
    MATERIAL_NOT_FOUND: /Material not found|Material não encontrado/
  }
} as const;

export const TEST_DIMENSIONS = {
  INVALID: {
    ZERO_WIDTH: { width: '0', height: '150' },
    ZERO_HEIGHT: { width: '200', height: '0' },
    NEGATIVE: { width: '-100', height: '150' },
    EMPTY: { width: '', height: '' }
  },
  VALID: {
    SMALL: { width: '100', height: '100' },
    MEDIUM: { width: '200', height: '150' },
    LARGE: { width: '300', height: '200' }
  }
} as const;