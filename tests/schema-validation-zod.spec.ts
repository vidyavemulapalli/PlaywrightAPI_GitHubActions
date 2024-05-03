/* To install zod library - npm install zod */

import userProfileSchema from '../tests/testdata/json-schema-zod';
import { test } from '@playwright/test';

test('API shema validation - ZOD', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users?page=2');
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  // This will throw an error if the data does not conform to the schema
  // ZodError has all the necessary messages for actual vs expected and the path for all the failures
  // no need of printing statements for the errors
  const parsedData = userProfileSchema.parse(jsonResponse);

  // If validation passes without throwing, log success (or perform further tests)
  console.log('Validation successful:', parsedData);
});
