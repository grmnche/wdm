import Block from "../../utils/Block.ts";
import template from "./btn_action.hbs";

interface BtnActionProps {
  actionName?: string | number | undefined;
  type?: string;
  class?: string;
  events?: {
    click: (event?: MouseEvent) => void;
  };
}

export class BtnAction extends Block {
  constructor(props: BtnActionProps) {
    super({ type: "button", ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
