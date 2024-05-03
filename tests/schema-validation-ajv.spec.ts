/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-call */

/*ensure you have AJV installed in your project. If not, you can add them using npm . You might also need @types/node for Node.js type definitions, which can be helpful for TypeScript development.

npm install playwright ajv
npm install typescript @types/node --save-dev */

import Ajv from 'ajv';
import userProfileSchema from '../tests/testdata/json-schema.json';
import { expect, test } from '@playwright/test';

test.describe('API tests', () => {
  test('Get request Schema validation', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
    const jsonResponse = await response.json();
    console.log(jsonResponse);

    // Schema validation using ajv with allErrors option
    const ajvInstance = new Ajv({ allErrors: true });
    const validate = ajvInstance.compile(userProfileSchema);
    const valid = validate(jsonResponse);

    //printing the errors
    if (!valid && validate.errors) {
      console.log('Validation failed. Errors:');
      validate.errors.forEach((error, index) => {
        console.log(`Error ${index + 1}:`);
        console.log(`  Property: ${error.instancePath}`);
        console.log(`  Message: ${error.message}`);

        const actualValue = getNestedPropertyValue(jsonResponse, error.instancePath.substring(1).replace(/\//g, '.'));
        const actualType = actualValue !== undefined ? typeof actualValue : 'undefined';
        console.log(`  Actual type: ${actualType}`);

        if (error.params && error.params.type) {
          console.log(`  Expected Type: ${error.params.type}`);
        }
        if (error.keyword === 'required') {
          console.log(`  Missing Required Property: ${error.params.missingProperty}`);
        }
      });
    } else {
      console.log('Schema validation is successful');
    }
    expect(valid).toBeTruthy();
  });

  // Helper function to access nested properties using a path
  function getNestedPropertyValue(object: any, path: string) {
    if (!path) return undefined;
    const properties = path.split('.');
    let currentObject = object;
    for (const property of properties) {
      if (property in currentObject) {
        currentObject = currentObject[property];
      } else {
        return undefined; // Property not found
      }
    }
    return currentObject;
  }
});
