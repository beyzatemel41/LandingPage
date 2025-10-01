import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Button } from '../../components/button/button';
import { Accordion } from '../../components/accordion/accordion';
import { Card } from '../../components/card/card';
import { AppInput } from '../../components/input/input';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, Button, Accordion, AppInput, Modal, Card],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  faqItems = [
    { id: 'q1', question: 'Ürün nedir?', answer: 'Kısa bir açıklama.' },
    { id: 'q2', question: 'Ücretsiz mi?', answer: 'Başlangıç planı ücretsizdir.' },
    { id: 'q3', question: 'İptal edebilir miyim?', answer: 'Dilediğiniz zaman iptal edebilirsiniz.' },
  ];

  form = { name: '', email: '', search: '' };
  emailInvalid = false;
  openModal = false;
  isLightTheme = false;

  products = [
    { id: 'p1', name: 'Amber Noir', price: '₺349' },
    { id: 'p2', name: 'Citrus Bloom', price: '₺399' },
    { id: 'p3', name: 'Saffron Oud', price: '₺449' },
    { id: 'p4', name: 'Velvet Rose', price: '₺499' },
    { id: 'p5', name: 'Marine Breeze', price: '₺549' },
    { id: 'p6', name: 'Musk Essence', price: '₺599' },
  ];

  get filteredProducts() {
    const q = (this.form.search || '').toLowerCase().trim();
    if (!q) return this.products;
    return this.products.filter(p => p.name.toLowerCase().includes(q));
  }

  bestSellers = [
    { id: 'b1', name: 'En Çok Satan 01', price: '₺499' },
    { id: 'b2', name: 'En Çok Satan 02', price: '₺549' },
    { id: 'b3', name: 'En Çok Satan 03', price: '₺599' },
  ];

  toggleTheme() {
    const root = document.documentElement;
    const isLight = root.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    this.isLightTheme = next === 'light';
  }

  ngOnInit() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      this.isLightTheme = saved === 'light';
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const requiredMissing = !this.form.name || !this.form.email;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    this.emailInvalid = !emailPattern.test(this.form.email || '');
    if (requiredMissing || this.emailInvalid) return;
    alert('Teşekkürler! Form yalancı olarak gönderildi.');
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 64; // account header height
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}