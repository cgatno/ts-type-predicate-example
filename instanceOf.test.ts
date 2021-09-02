// Imports

// Utility function to validate types
import instanceOf from "./instanceOf";

// Set up

// The type we are going to validate against
type MyTypeRocks = {
  decision: boolean;
  name: string;
  status: "APPROVED" | "REJECTED";
};

// We need to create a descriptor since we can't validate against types (compile time) at runtime
// Object.freeze() guarantees that the descriptor will never change
const myTypeRocksDescriptor: MyTypeRocks = Object.freeze({
  decision: true,
  name: "Karl",
  status: "APPROVED",
});

// Tests

describe("instanceOf()", () => {
  it("returns false for an incorrect key type", () => {
    const testObj = {
      decision: "yes",
      name: "Chris",
      status: "REJECTED",
    };

    expect(instanceOf(testObj, myTypeRocksDescriptor)).toBe(false);
  });

  it("returns false for extra keys", () => {
    const testObj = {
      decision: true,
      name: "Carly",
      status: "REJECTED",
      pizzaSize: "XL",
    };

    expect(instanceOf(testObj, myTypeRocksDescriptor)).toBe(false);
  });

  it("returns false for missing keys", () => {
    const testObj = {
      decision: true,
      name: "Carly",
    };

    expect(instanceOf(testObj, myTypeRocksDescriptor)).toBe(false);
  });

  it("returns true for correct object signature", () => {
    const testObj = {
      decision: false,
      name: "Fiona",
      status: "REJECTED",
    };

    // This code also illustrates how the type predicate can be used in "real world" code
    let result = false;
    if (instanceOf(testObj, myTypeRocksDescriptor)) {
      result = true;

      // Note that TS now knows that `testObj` has the type `MyTypeRocks`!
      const myName = testObj.name;
    }

    expect(result).toBe(true);
  });

  // CAVEAT! We only check that the type is `string`, not against a literal
  it("returns true even when string literal type is not satisfied", () => {
    const testObj = {
      decision: false,
      name: "Fiona",
      status: "not a valid status!",
    };

    expect(instanceOf(testObj, myTypeRocksDescriptor)).toBe(true);
  });
});
