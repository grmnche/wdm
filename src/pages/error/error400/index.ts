import Block from "../../../utils/Block.ts";
import template from "./error400.hbs";

export class Error400 extends Block {
  constructor() {
    super({
      error: {
        errorText: "Sorry, wrong page...",
        errorNumber: "400",
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
