import { AbstractControl } from '@angular/forms';

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;

}

export function noWhitespaceValidator(control: AbstractControl) {
  const isWhitespace = control.value.indexOf('  ') > -1;
  const isValid = ! isWhitespace;
  return isValid ? null : { 'whitespace': true };
}



