import Block from "../../utils/Block.ts";
import template from "./login.hbs";
import { Input } from "../../components/input/index.ts";
import { Button } from "../../components/button/index.ts";
import AuthController from "../../controllers/AuthController.ts";
import { SignupData } from "../../api/AuthAPI.ts";
import { Link } from "../../components/link/index.ts";

export class Login extends Block {
  constructor() {
    super({
      loginError:
        "Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters",
      passwordError:
        "At least one capital letter, one number and be between 8 and 40 characters long",
    });
  }

  init() {
    this.children.login = new Input({
      label: "Login",
      name: "login",
      type: "text",
      placeholder: "Login",
    });

    this.children.password = new Input({
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
    });

    this.children.button = new Button({
      label: "Войти",
      class: "btn btn-dark",
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      label: "Create account",
      to: "/sign-up",
    });
  }

  onSubmit() {
    const inputs = Object.values(this.children).filter(
      (child) => child instanceof Input,
    ) as Input[];

    const isValid = inputs.every((input) => input.onValidate());

    if (isValid) {
      console.log("data is valid");
      const values = inputs.map((input) => [input.getName(), input.getValue()]);

      const data = Object.fromEntries(values);

      AuthController.signin(data as SignupData);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
