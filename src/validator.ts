import { z } from 'zod';

/**
 * List of toppings that should never go on pizza
 */
const FORBIDDEN_TOPPINGS = ['candy', 'toothpaste', 'cactus', 'dirt'];

/**
 * Zod schema for validating pizza objects
 */
const pizzaSchema = z.object({
  size: z.number().positive('Size must be a positive number'),
  crust: z.enum(['stuffed', 'normal'], {
    errorMap: () => ({ message: 'Crust must be either "stuffed" or "normal"' }),
  }),
  isDeepDish: z.boolean().optional().default(false),
  toppings: z
    .array(z.string())
    .optional()
    .refine(
      (toppings) => {
        if (!toppings) {
          return true;
        }
        return !toppings.some((topping) =>
          FORBIDDEN_TOPPINGS.includes(topping.toLowerCase())
        );
      },
      {
        message: `Toppings cannot include: ${FORBIDDEN_TOPPINGS.join(', ')}`,
      }
    ),
});

/**
 * Type representing a valid pizza
 */
export type Pizza = z.infer<typeof pizzaSchema>;

/**
 * Result type when validation succeeds
 */
type ValidationSuccess = {
  isPizza: true;
  pizza: Pizza;
};

/**
 * Result type when validation fails
 */
type ValidationFailure = {
  isPizza: false;
  errors: string[];
};

/**
 * Discriminated union type for validation results
 */
export type ValidationResult = ValidationSuccess | ValidationFailure;

/**
 * Validates whether an unknown input is a valid pizza
 * 
 * @param input - The input to validate
 * @returns A ValidationResult indicating success or failure with details
 * 
 * @example
 * const result = validatePizza({ size: 12, crust: 'normal' });
 * if (result.isPizza) {
 *   console.log('Valid pizza:', result.pizza);
 * } else {
 *   console.log('Errors:', result.errors);
 * }
 */
export function validatePizza(input: unknown): ValidationResult {
  const result = pizzaSchema.safeParse(input);

  if (result.success) {
    return {
      isPizza: true,
      pizza: result.data,
    };
  } else {
    return {
      isPizza: false,
      errors: result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
    };
  }
}
