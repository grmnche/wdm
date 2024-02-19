import Block from "../../../utils/Block.ts";
import { BtnAction } from "../../btn_action/Index.ts";
import template from "./user_action.hbs";

interface UserActionProps {}
export class UserAction extends Block {
  constructor(props: UserActionProps) {
    super({
      ...props,
    });
  }

  init() {
    this.children.addUser = new BtnAction({
      actionName: "Add user",
      class: "modal-btn add-user-btn",
      events: {
        click: () => {
          document.querySelector(".add-user-modal")?.classList.add("active");
        },
      },
    });

    this.children.removeUser = new BtnAction({
      actionName: "Remove user",
      class: "modal-btn remove-user-btn",
      events: {
        click: () => {
          document.querySelector(".remove-user-modal")?.classList.add("active");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
