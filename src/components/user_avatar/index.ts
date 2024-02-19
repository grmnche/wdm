import UserController from "../../controllers/UserController.ts";
import Block from "../../utils/Block.ts";
import template from "./user_avatar.hbs";

interface UserAvatarProps {
  class?: string;
  src?: string | undefined;
  userName?: string;
  events?: {
    click: () => void;
  };
}

export class UserAvatar extends Block {
  constructor(props: UserAvatarProps) {
    super({
      ...props,
      src: UserController.getAvatar(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
