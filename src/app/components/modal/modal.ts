import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal implements AfterViewInit {
  @Input() open = false;
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();

  @ViewChild('dialog') dialogRef?: ElementRef<HTMLDivElement>;
  private lastFocusedElement: Element | null = null;

  ngAfterViewInit(): void {
    if (this.open) this.focusFirst();
  }

  ngOnChanges(): void {
    if (this.open) {
      this.lastFocusedElement = document.activeElement;
      setTimeout(() => this.focusFirst());
    }
  }

  close() {
    this.open = false;
    this.closed.emit();
    const el = this.lastFocusedElement as HTMLElement | null;
    if (el && typeof el.focus === 'function') el.focus();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target && (event.target as HTMLElement).classList.contains('modal-surface')) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) this.close();
  }

  private focusFirst() {
    const root = this.dialogRef?.nativeElement;
    if (!root) return;
    const focusable = root.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }
}
