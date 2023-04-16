import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[validateEmailRegex]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidationDirective,
      multi: true,
    },
  ],
})
export class EmailValidationDirective implements Validator {
  @Input() email: string = '';
  validate(control: AbstractControl): ValidationErrors | null {
    return this.ValidateEmail(this.email)(control);
  }

  public ValidateEmail(email: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email
      );
      return forbidden ? { forbidden: { value: control.value } } : null;
    };
  }
}
