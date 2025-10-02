import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  /**
   * Visual variant of the button.
   */
  @Input() variant: 'primary' | 'ghost' | 'outline' = 'primary';

  /**
   * Size of the button.
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Makes the button expand to full available width.
   */
  @Input() block = false;

  /**
   * Disables the button and prevents clicks.
   */
  @Input() disabled = false;

  /**
   * Shows a loading state and sets aria-busy.
   */
  @Input() loading = false;

  /**
   * Button native type.
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Accessible label override when no visible text.
   */
  @Input('ariaLabel') ariaLabel?: string;

  /** Emits when user clicks the button (not emitted when disabled or loading). */
  @Output() pressed = new EventEmitter<MouseEvent>();

  @HostBinding('class.is-block') get isBlock() { return this.block; }
  @HostBinding('attr.aria-busy') get ariaBusy() { return this.loading ? 'true' : null; }

  onClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.pressed.emit(event);
  }
}
