export class FormValidator {
  static validateName(value: string): boolean {
    const regex = /^[A-Za-zА-Яа-яЁё-]+$/;
    return regex.test(value);
  }

  static validateLogin(value: string): boolean {
    const regex = /^[A-Za-z0-9_-]{3,20}$/;
    return regex.test(value);
  }

  static validateEmail(value: string): boolean {
    const regex = /^[A-Za-z0-9_.+-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-.]+$/;
    return regex.test(value);
  }

  static validatePassword(value: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
    return regex.test(value);
  }

  static validatePhone(value: string): boolean {
    const regex = /^\+?\d{10,15}$/;
    return regex.test(value);
  }

  static validateMessage(value: null | string): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    return value.trim() !== "";
  }
}
