import { Component, OnInit, OnDestroy } from '@angular/core';
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

export class Landing implements OnInit, OnDestroy {
  faqItems = [
    { id: 'q1', question: 'Orijinal parfümü nasıl anlarım?', answer: '💡 Orijinal parfümler kutu, seri numarası ve şişe tasarımında kaliteyi belli eder. Ayrıca kokusu hem dengeli hem de uzun sürelidir. Bizim sitemizde satılan tüm ürünler %100 orijinaldir.' },
    { id: 'q2', question: 'Parfümü nasıl saklamalıyım?', answer: '💡 Parfümü direkt güneş ışığından uzak, serin ve kuru bir yerde saklamalısınız. Banyoda bırakmak nemden dolayı kokuyu bozabilir.' },
    { id: 'q3', question: 'Parfümü hangi bölgelere sıkmalıyım?', answer: ' 💡 Nabız noktaları (bilek içi, boyun, kulak arkası) en uygun bölgelerdir. Bu bölgeler sıcak olduğu için kokunun yayılımı artar.' },
  ];

  form = { name: '', email: '', search: '' };
  emailInvalid = false;
  openModal = false;
  isLightTheme = false;

products = [
  { id: 'p1', name: 'Amber Noir', price: '₺349', image: 'P1.jpg' },
  { id: 'p2', name: 'Aventus', price: '₺399', image: 'P2.jpg' },
  { id: 'p3', name: 'Bleu De Chanel', price: '₺299', image: 'P3.jpg' },
  { id: 'p4', name: 'Dior Sauvage', price: '₺379', image: 'P4.jpg' },
  { id: 'p5', name: 'Fahrenheit', price: '₺259', image: 'P5.jpg' },
  { id: 'p6', name: 'Hugo Boss Bottled', price: '₺199', image: 'P6.jpg' },
  { id: 'p7', name: 'Irıs Toraffe', price: '₺309', image: 'P7.jpg' },
  { id: 'p8', name: 'Angelıque Nore', price: '₺455', image: 'P8.jpg' },
  { id: 'p9', name: 'Amore Love', price: '₺199', image: 'P9.jpg' },
  { id: 'p10', name: 'CK One', price: '₺1099', image: 'P10.jpg' },
  { id: 'p11', name: 'Amore Selfish', price: '₺299', image: 'P11.jpg' },
  { id: 'p12', name: 'Amore True', price: '₺149', image: 'P12.jpg' },
  { id: 'p13', name: 'Gentleman Givenchy', price: '₺189', image: 'P13.jpg' },
  { id: 'p14', name: 'Amore Beyza', price: '₺199', image: 'P14.jpg' },
  { id: 'p15', name: 'Caıa Senso', price: '₺999', image: 'P15.jpg' }
];


  get filteredProducts() {
    const q = (this.form.search || '').toLowerCase().trim();
    if (!q) return this.products;
    return this.products.filter(p => p.name.toLowerCase().includes(q));
  }

  bestSellers = [
    { id: 'b1', name: 'Tom Ford Black Orchid', price: '₺499', image: 'P7.jpg' },
    { id: 'b2', name: 'Creed Aventus', price: '₺549', image: 'P8.jpg' },
    { id: 'b3', name: 'Maison Margiela REPLICA', price: '₺599', image: 'parfume1.jpg' },
    { id: 'b4', name: 'Chanel No. 5', price: '₺649', image: 'parfume2.jpg' },
    { id: 'b5', name: 'Dior J\'adore', price: '₺579', image: 'P1.jpg' },
    { id: 'p12', name: 'Amore True', price: '₺149', image: 'P12.jpg' },
    { id: 'p13', name: 'Gentleman Givenchy', price: '₺189', image: 'P13.jpg' },
    { id: 'p15', name: 'Caıa Senso', price: '₺999', image: 'P15.jpg' }
  ];

  // Carousel properties
  currentSlide = 0;
  slideWidth = 100; // percentage
  autoSlideInterval: any;
  private readonly autoSlideDelay = 4000; // 4 seconds

  get maxSlide(): number {
    // Responsive slide calculation
    const screenWidth = window.innerWidth;
    let itemsPerView = 1;
    
    if (screenWidth >= 1025) {
      itemsPerView = 3;
    } else if (screenWidth >= 641) {
      itemsPerView = 2;
    } else {
      itemsPerView = 1;
    }
    
    // Masaüstünde maksimum 2 adım ilerlesin
    const maxPossibleSlides = Math.max(0, this.bestSellers.length - itemsPerView);
    return screenWidth >= 1025 ? Math.min(maxPossibleSlides, 2) : maxPossibleSlides;
  }

  get dots(): number[] {
    return Array(this.maxSlide + 1).fill(0).map((_, i) => i);
  }

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
    
    // Start auto-slide
    this.startAutoSlide();
    
    // Listen for window resize to recalculate maxSlide
    window.addEventListener('resize', () => {
      if (this.currentSlide > this.maxSlide) {
        this.currentSlide = this.maxSlide;
      }
    });
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  // Carousel methods
  nextSlide() {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Loop back to start
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.maxSlide; // Loop to end
    }
  }

  goToSlide(index: number) {
    this.currentSlide = Math.max(0, Math.min(index, this.maxSlide));
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  pauseCarousel() {
    this.stopAutoSlide();
  }

  resumeCarousel() {
    this.startAutoSlide();
  }

  // Keyboard navigation
  onCarouselKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prevSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide();
        break;
      case 'Home':
        event.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToSlide(this.maxSlide);
        break;
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