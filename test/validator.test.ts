import { validatePizza } from '../src/validator';

describe('validatePizza', () => {
  // Valid test case
  test('should validate a correct pizza object', () => {
    const validPizza = {
      size: 12,
      crust: 'normal',
      isDeepDish: false,
      toppings: ['pepperoni', 'mushrooms', 'olives'],
    };

    const result = validatePizza(validPizza);

    expect(result.isPizza).toBe(true);
    if (result.isPizza) {
      expect(result.pizza.size).toBe(12);
      expect(result.pizza.crust).toBe('normal');
      expect(result.pizza.toppings).toEqual(['pepperoni', 'mushrooms', 'olives']);
    }
  });

  // Invalid test case: Missing required field
  test('should reject pizza with missing size field', () => {
    const invalidPizza = {
      crust: 'stuffed',
    };

    const result = validatePizza(invalidPizza);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((err) => err.includes('size'))).toBe(true);
    }
  });

  // Invalid test case: Invalid crust type
  test('should reject pizza with invalid crust type', () => {
    const invalidPizza = {
      size: 14,
      crust: 'thin',
    };

    const result = validatePizza(invalidPizza);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((err) => err.includes('crust'))).toBe(true);
    }
  });

  // Invalid test case: Forbidden topping
  test('should reject pizza with forbidden toppings', () => {
    const invalidPizza = {
      size: 16,
      crust: 'normal',
      toppings: ['cheese', 'candy'],
    };

    const result = validatePizza(invalidPizza);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((err) => err.includes('toppings'))).toBe(true);
    }
  });

  test('should validate pizza without optional fields', () => {
    const minimalPizza = {
      size: 10,
      crust: 'stuffed',
    };

    const result = validatePizza(minimalPizza);

    expect(result.isPizza).toBe(true);
    if (result.isPizza) {
      expect(result.pizza.isDeepDish).toBe(false);
    }
  });
});
