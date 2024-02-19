import Block from "../../utils/Block.ts";
import { validateField } from "../../utils/Validation/Validation.ts";
import template from "./profile-field.hbs";

interface profileFieldProps {
  name: string | undefined;
  value: string | number | undefined;
  inputName?: string;
  events?: {
    focusout: (event: FocusEvent) => void;
  };
}

export class profileField extends Block<profileFieldProps> {
  constructor(props: profileFieldProps) {
    super({
      ...props,
      events: {
        focusout: () => this.onValidate(),
      },
    });
  }

  public onValidate() {
    const input = this.element?.querySelector("input");
    if (input) {
      return validateField(input);
    } else {
      return null;
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
