/**
 * Type predicate to validate an input object `input` against a specific type definition `T` using
 * a descriptor. IMPORTANT: note caveats outlined in readme and instanceOf.test.ts.
 * See https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates.
 *
 * @template T The type to validate against.
 * @param {*} input The input object to validate.
 * @param {T} descriptor A descriptor object that conforms to type `T` which will be used for
 * runtime validation.
 * @return {boolean}  {input is T} True if input matches type `T`, false otherwise.
 */
export default function instanceOf<T extends Record<string, unknown>>(
  input: any,
  descriptor: T
): input is T {
  // Create copy of input for tracking found keys
  const inputCopy = { ...input };

  // For each key on the descriptor, run some tests on input to see if it complies with our type
  for (const key of Object.keys(descriptor)) {
    // Case: input does not contain key on descriptor
    if (!(key in inputCopy)) return false;

    // Case: JS type of input.key does not match JS type of descriptor.key
    if (typeof descriptor[key] !== typeof inputCopy[key]) return false;

    // TODO: Add more specific test cases here! Only checking based on JS type (using `typeof`) is
    // a very loose form of validation.

    // Delete this key/value pair out of input copy so we know it passed
    delete inputCopy[key];
  }

  // Case: Input has extra keys if the copy has any keys remaining after loop
  return Object.keys(inputCopy).length === 0;
}
