import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Button } from '../../components/button/button';
import { Card } from '../../components/card/card';
import { Accordion } from '../../components/accordion/accordion';
import { AppInput } from '../../components/input/input';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule, NgIf, Button, Card, Accordion, AppInput, Modal],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  faqItems = [
    { id: 'q1', question: 'Ürün nedir?', answer: 'Kısa bir açıklama.' },
    { id: 'q2', question: 'Ücretsiz mi?', answer: 'Başlangıç planı ücretsizdir.' },
    { id: 'q3', question: 'İptal edebilir miyim?', answer: 'Dilediğiniz zaman iptal edebilirsiniz.' },
  ];

  form = { name: '', email: '' };
  emailInvalid = false;
  openModal = false;
  sidebarOpen = false;

  toggleTheme() {
    const root = document.documentElement;
    const isLight = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
  }

  ngOnInit() {
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
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
    this.sidebarOpen = false;
  }
}