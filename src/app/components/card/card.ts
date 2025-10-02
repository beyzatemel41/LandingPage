import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Button } from '../button/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, NgFor, Button],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() title = '';
  @Input() price?: string;
  @Input() features: string[] = [];
  @Input() ctaLabel?: string;
  @Input() highlight = false;
  @Input() image?: string; // Ürün resmi için
  @Input() explanation?: string;
}
