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
  // Create copy of descriptor for tracking keys
  const copy = { ...descriptor };

  // For each key on the input, run some tests to see if it complies with our type
  for (const key of Object.keys(input)) {
    // Case: input has a key not found in descriptor
    if (!(key in copy)) return false;

    // Case: JS type of input.key does not match JS type of descriptor.key
    if (typeof copy[key] !== typeof input[key]) return false;

    // TODO: Add more specific test cases here! Only checking based on JS type (using `typeof`) is
    // a very loose form of validation.

    // Delete this key/value pair out of descriptor copy so we know it passed
    delete copy[key];
  }

  // Case: Input did not have all keys required by type T
  // If copy has any keys left, it means the input did not match
  return Object.keys(copy).length === 0;
}
