import { FormValidator } from "./FormValidator.ts";

export const validateField = (input: HTMLInputElement) => {
  const value = input.value;
  const fieldName = input.name;

  let isValid = false;

  switch (fieldName) {
    case "login":
      isValid = FormValidator.validateLogin(value);
      break;
    case "password":
      isValid = FormValidator.validatePassword(value);
      break;
    case "email":
      isValid = FormValidator.validateEmail(value);
      break;
    case "first_name":
    case "second_name":
      isValid = FormValidator.validateName(value);
      break;
    case "phone":
      isValid = FormValidator.validatePhone(value);
      break;
    case "search":
    case "message":
      isValid = FormValidator.validateMessage(value);
      break;
    default:
      console.error(`Валидация для "${fieldName}" не реализована.`);
      break;
  }

  if (!isValid) {
    console.error(`Неверный формат для "${fieldName}"`);
    input.nextElementSibling?.classList.add("show");
  }

  return isValid;
};

export const focusoutValidation = (event: FocusEvent) => {
  console.log("f");
  const input = event.target as HTMLInputElement;
  validateField(input);
};

interface FormData {
  [key: string]: string[];
}

export const checkValidation = (event: Event): void => {
  event.preventDefault();

  const button = event.target as HTMLButtonElement;
  const form = button.closest("form");

  if (!form) {
    console.error("Форма не найдена");
    return;
  }

  const inputs = form.querySelectorAll("input");
  let isFormValid = true;
  const formData: FormData = {};

  inputs.forEach((input: HTMLInputElement) => {
    const isValid = validateField(input);
    if (!isValid) {
      isFormValid = false;
    }

    const fieldName = input.name;
    const value = input.value;

    if (formData[fieldName]) {
      formData[fieldName].push(value);
    } else {
      formData[fieldName] = [value];
    }
  });

  if (isFormValid) {
    console.log(formData);
  } else {
    console.error("Невалидные данные");
  }
};
