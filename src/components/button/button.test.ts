import { Button } from "./index.ts";
import { expect } from "chai";

describe("Button", () => {
  it("should render", () => {
    new Button({});
  });

  it("element should return button", () => {
    const button = new Button({});
    const element = button.element;

    expect(element).to.be.instanceof(window.HTMLButtonElement);
  });
});
