import Block from "../../utils/Block.ts";
import template from "./registration.hbs";
import { Input } from "../../components/input/index.ts";
import { SignupData } from "../../api/AuthAPI.ts";
import AuthController from "../../controllers/AuthController.ts";
import { Link } from "../../components/link/index.ts";
import { Button } from "../../components/button/index.ts";

export class SignUp extends Block {
  constructor() {
    super({
      nameError: "Use letters and hyphens only",
      emailError: "Invalid email address",
      loginError:
        "Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters",
      passwordError:
        "At least one capital letter, one number and be between 8 and 40 characters long",
      phoneError: "Enter the number in the format +XXXXXXXXXXXX",
    });
  }

  init() {
    this.children.firstName = new Input({
      name: "first_name",
      type: "text",
      placeholder: "Имя",
    });

    this.children.secondName = new Input({
      name: "second_name",
      type: "text",
      placeholder: "Фамилия",
    });

    this.children.email = new Input({
      name: "email",
      type: "email",
      placeholder: "E-mail",
    });

    this.children.login = new Input({
      name: "login",
      type: "text",
      placeholder: "Логин",
    });

    this.children.phone = new Input({
      name: "phone",
      type: "tel",
      placeholder: "Телефон",
    });

    this.children.password = new Input({
      name: "password",
      type: "password",
      placeholder: "Пароль",
      events: {
        focusout: () => this.onSubmit(),
      },
    });

    this.children.button = new Button({
      label: "Register",
      class: "btn btn-dark",
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      label: "Log in",
      to: "/",
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

      AuthController.signup(data as SignupData);
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
