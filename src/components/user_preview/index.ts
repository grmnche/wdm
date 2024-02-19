import Block from "../../utils/Block.ts";
import template from "./user_preview.hbs";

interface UserPreviewProps {
  userName: string;
}

export class UserPreview extends Block {
  constructor(props: UserPreviewProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
