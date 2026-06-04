import { example } from "./index.js";

describe("example", () => {
  it("Given a string, return the same string", () => {
    expect(example("Hello")).toEqual("Hello");
  });
});

// jest src/test.ts --watch