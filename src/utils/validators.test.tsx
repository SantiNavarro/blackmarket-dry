import { isValidEmail, isValidPassword } from './validators';

describe('Validates emails', () => {
  test.each([
    ['san@rootstrap.com', true],
    ['jm@r.com.ar', true],
    ['rs@rs.ar', true],
    ['@rootstrap.com', false],
    ['', false],
    [null, false],
    [{}, false],
    ['jm@', false],
    ['rs', false],
  ])('Returns validation results given truthiness of cases, given regex', (arg, expectedResult) => {
    expect(isValidEmail(arg as string)).toEqual(expectedResult);
  });
});

describe('Validates passwords', () => {
  test.each([
    ['p123456', true],
    ['p1234', false],
    ['p123', false],
    ['', false],
    [null, false],
    [{}, false],
  ])(
    'Returns validation results given truthiness of cases, being longer than five chars',
    (arg, expectedResult) => {
      expect(isValidPassword(arg as string)).toEqual(expectedResult);
    }
  );
});
