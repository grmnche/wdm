import Block from "../../../../utils/Block.ts";
import template from "./settings-password.hbs";
import { ProfileBackBar } from "../../../../components/profile_back_bar/index.ts";
import { UserAvatar } from "../../../../components/user_avatar/index.ts";
import { Button } from "../../../../components/button/index.ts";
import { Input } from "../../../../components/input/index.ts";
import { User } from "../../../../api/AuthAPI.ts";
import UserController from "../../../../controllers/UserController.ts";

export class SettingsPassword extends Block {
  constructor() {
    super({
      passwordError:
        "At least one capital letter, one number and be between 8 and 40 characters long",
    });
  }

  init() {
    this.children.oldPassword = new Input({
      name: "password",
      type: "password",
      class: "item-value",
      placeholder: ".......",
    });

    this.children.newPassword = new Input({
      name: "password",
      type: "password",
      class: "item-value",
      placeholder: "..........",
    });

    this.children.repeatNewPassword = new Input({
      name: "password",
      type: "password",
      class: "item-value",
      placeholder: "..........",
    });

    this.children.profileBackBar = new ProfileBackBar({});

    this.children.userAvatar = new UserAvatar({
      class: "user-avatar",
      src: "/src/images/avatar.png",
    });

    this.children.button = new Button({
      class: "btn btn-light profile-button",
      label: "Save",
      events: {
        click: () => this.onSubmit(),
      },
    });
  }

  onSubmit() {
    const inputs = Object.values(this.children).filter(
      (child) => child instanceof Input,
    ) as Input[];

    const isValid = inputs.every((input) => input.onValidate());

    if (isValid) {
      const oldPassword = (this.children.oldPassword as Input).getValue();
      const newPassword = (this.children.newPassword as Input).getValue();
      const repeatNewPassword = (
        this.children.repeatNewPassword as Input
      ).getValue();

      if (newPassword !== repeatNewPassword) {
        alert("New passwords must match");
        return;
      }

      const userData: Partial<User> = {
        oldPassword,
        newPassword,
      };

      UserController.updatePassword(userData);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
