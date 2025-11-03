# Pizza Validator
A TypeScript package for validating pizza objects using Zod schemas. This package helps ensure that your pizza data meets specific requirements including size, crust type, and topping validation.

## Installation
You can install this package locally for testing:
```bash
npm install /path/to/pizza-validator
```

## Usage

### As a Dependency
Import the validatePizza function into your TypeScript or JavaScript project:
```typescript
import { validatePizza } from 'pizza-validator';

const myPizza = {
  size: 12,
  crust: 'normal',
  isDeepDish: false,
  toppings: ['pepperoni', 'mushrooms', 'cheese']
};

const result = validatePizza(myPizza);

if (result.isPizza) {
  console.log('Valid pizza!', result.pizza);
} else {
  console.log('Invalid pizza. Errors:', result.errors);
}
```

### CLI Usage
After installing globally, you can use the CLI to validate JSON files:

```bash
npm install --global pizza-validator

pizza-validator my-pizza.json
```

Example JSON file (my-pizza.json):

```json
{
  "size": 14,
  "crust": "stuffed",
  "isDeepDish": true,
  "toppings": ["pepperoni", "sausage", "onions"]
}
```

## Pizza Schema
A valid pizza must have:

size (number): Diameter in inches (must be positive)  
crust (string): Either "stuffed" or "normal"  
isDeepDish (boolean, optional): Defaults to false  
toppings (array of strings, optional): Cannot include: candy, toothpaste, soap, or dirt  

## API
```
validatePizza(input: unknown): ValidationResult
```
Validates whether an input is a valid pizza.
Parameters:

input: Any value to validate

Returns:
```
ValidationResult: A discriminated union with:

{ isPizza: true, pizza: Pizza } on success
{ isPizza: false, errors: string[] } on failure
```



## Development
```
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## License
ISC
