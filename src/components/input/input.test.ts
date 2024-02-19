import { Input } from "./index.ts";
import { expect } from "chai";

describe("Input", () => {
  it("should render", () => {
    new Input({ name: "password", type: "password" });
  });

  it("element should return button", () => {
    const input = new Input({ name: "password", type: "password" });
    const element = input.element;

    expect(element).to.be.instanceof(window.HTMLInputElement);
  });
});
