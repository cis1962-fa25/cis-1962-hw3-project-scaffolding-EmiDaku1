#!/usr/bin/env node

import { readFileSync } from 'fs';
import { parseArgs } from 'node:util';
import { validatePizza } from './validator';

/**
 * Main CLI function that reads a JSON file and validates it as a pizza
 */
function main(): void {
  try {
    // Parse command line arguments
    const { positionals } = parseArgs({
      allowPositionals: true,
    });

    // Check if a file path was provided
    if (positionals.length === 0) {
      console.error('Error: Please provide a JSON file path');
      console.log('Usage: pizza-validator <file.json>');
      process.exit(1);
    }

    const filePath = positionals[0];

    // Read the file
    let fileContent: string;
    try {
      fileContent = readFileSync(filePath, 'utf-8');
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error reading file: ${error.message}`);
      } else {
        console.error('Error: Could not read the file');
      }
      process.exit(1);
    }

    // Parse JSON
    let jsonData: unknown;
    try {
      jsonData = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error: Invalid JSON format in file');
      if (error instanceof Error) {
        console.error(`Details: ${error.message}`);
      }
      console.error(`File content: ${fileContent}`);
      process.exit(1);
    }

    // Validate the pizza
    const result = validatePizza(jsonData);

    if (result.isPizza) {
      console.log('✓ Valid pizza!');
      console.log(JSON.stringify(result.pizza, null, 2));
    } else {
      console.log('✗ Not a valid pizza');
      console.log('\nErrors:');
      result.errors.forEach((error) => console.log(`  - ${error}`));
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

main();
