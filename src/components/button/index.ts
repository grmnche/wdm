import Block from "../../utils/Block.ts";
import template from "./button.hbs";

interface ButtonProps {
  label?: string | number | undefined;
  type?: string;
  class?: string;
  events?: {
    click: (event?: MouseEvent) => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: "button", ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
