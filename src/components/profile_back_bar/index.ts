import Block from "../../utils/Block.ts";
import Router from "../../utils/Router.ts";
import { Button } from "../button/index.ts";
import template from "./profile_back_bar.hbs";

export class ProfileBackBar extends Block {
  init() {
    this.children.button = new Button({
      class: "back-bar__btn",
      events: {
        click: () => {
          Router.go("/messenger");
        },
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
