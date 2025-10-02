import { Component, EventEmitter, forwardRef, HostBinding, Input as Inp, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInput),
      multi: true
    }
  ]
})
export class AppInput implements ControlValueAccessor {
  @Inp() id = '';
  @Inp() name = '';
  @Inp() type: 'text' | 'email' | 'password' | 'tel' | 'search' = 'text';
  @Inp() placeholder = '';
  @Inp() label?: string;
  @Inp() required = false;
  @Inp() disabled = false;
  @Inp() invalid = false;
  @Inp('ariaDescribedBy') ariaDescribedBy?: string;

  @Output() valueChange = new EventEmitter<string>();

  @HostBinding('class.is-disabled') get isDisabledHost() { return this.disabled; }

  value = '';
  isTouched = false;

  onChange: (val: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: string): void {
    this.value = val ?? '';
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(val: string) {
    this.value = val ?? '';
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  handleBlur() {
    this.isTouched = true;
    this.onTouched();
  }
}
