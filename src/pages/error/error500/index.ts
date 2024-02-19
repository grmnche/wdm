import Block from "../../../utils/Block.ts";
import template from "./error500.hbs";

export class Error500 extends Block {
  constructor() {
    super({
      error: {
        errorText: "Oops... we're already fixing",
        errorNumber: "500",
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
