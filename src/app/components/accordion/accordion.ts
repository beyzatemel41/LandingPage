import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [NgFor],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss'
})
export class Accordion {
  @Input() items: { id: string; question: string; answer: string }[] = [];
  @Input() single = true;
  openItemIds = new Set<string>();

  isOpen(id: string) { return this.openItemIds.has(id); }

  toggle(id: string) {
    if (this.single) {
      this.openItemIds.clear();
      this.openItemIds.add(id);
      return;
    }
    if (this.openItemIds.has(id)) this.openItemIds.delete(id); else this.openItemIds.add(id);
  }
}
