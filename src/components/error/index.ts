import Block from "../../utils/Block.ts";
import template from "./error.hbs";

interface ErrorProps {
  errorNumber: string;
  errorText: string;
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
