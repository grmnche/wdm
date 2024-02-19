import Block from "../../utils/Block.ts";
import { validateField } from "../../utils/Validation/Validation.ts";
import template from "./input.hbs";

interface InputProps {
  name: string;
  type: string;
  class?: string;
  placeholder?: string;
  label?: string;
  inputError?: string;
  accept?: string;
  value?: string | number;
  events?: {
    focusout?: (event: FocusEvent) => void;
    change?: (event: Event) => void;
  };
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        focusout: () => this.onValidate(),
        change: (event: Event) => this.onFileChange(event),
      },
    });
  }

  public setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value);
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  public onValidate() {
    return validateField(this.element as HTMLInputElement);
  }

  public onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    console.log("fileInput: ", fileInput);
    const file: File | undefined = fileInput.files?.[0];

    if (file) {
      console.log(file);
      // Отправить файл на сервер
      // UserController.uploadAvatar(file);
    }
  }

  public getFile(): File | undefined {
    const fileInput = this.element as HTMLInputElement;
    return fileInput.files?.[0];
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
