import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static fullNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      if (!value) {
        return null; // Return if the value is empty, required validator will handle it.
      }

      const noNumbers = /^[^\d]*$/;
      const noLeadingWhitespace = /^[^\s].*$/;

      if (!noNumbers.test(value)) {
        return { hasNumber: true };
      }

      if (!noLeadingWhitespace.test(value)) {
        return { leadingWhitespace: true };
      }

      if (value.length > 255) {
        return { maxLengthExceeded: true };
      }

      return null;
    };
  }
}
