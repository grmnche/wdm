import { expect } from "chai";
import { set } from "./helpers.ts";

describe("set function", () => {
  const keypath = "test";
  const value = "some value";
  let obj: Record<string, unknown>;

  beforeEach(() => {
    obj = {};
  });

  it("should set a value by keypath to the object", () => {
    set(obj, keypath, value);

    expect(obj).to.haveOwnProperty(keypath, value);
  });

  it("should return original object", () => {
    const result = set(obj, keypath, value);

    obj["test2"] = "another value";

    expect(result).to.equal(obj);
  });

  it("should return original object if it's is not an object", () => {
    const notObject = "string";

    const result = set(notObject, keypath, value);

    expect(result).to.eq(notObject);
  });

  it("should throw an error if path is not a string", () => {
    const notString = 10;

    // @ts-expect-error error
    const f = () => set(obj, notString, value);

    expect(f).to.throw(Error);
  });
});
