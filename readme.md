# Illustrating TypeScript Type Predicates ✨

A simple test suite for illustrating how to use [TS type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) and descriptor objects to validate input against a type at runtime.

## Getting Started

Clone the repo, then:

    npm install
    npm run test

## Caveats

The `instanceOf` type predicate function contained within is _extremely_ basic and provides only a loose form of validation. Since object property types are only validated using JavaScript's `typeof` operator, it doesn't check for validity of things like string literals, nested object shapes, etc.

The primary purpose of this example is to illustrate how a type predicate might be used to validate an object type with several distinct members and how TS uses the predicate to provide type hinting in your code.

If you want to use this function in production, you should modify it to provide stricter validation for your specific use case.

## License

This source code is licensed under the [MIT license](LICENSE.md).
