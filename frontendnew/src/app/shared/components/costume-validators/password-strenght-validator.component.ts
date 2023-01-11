import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value;
        const hasNumber = /\d/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNonalphas = /\W/.test(password);
        const valid = hasNumber && hasUpper && hasLower && hasNonalphas;
        return valid ? null : { passwordStrength: true };
    };
}


