import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'LandingPage';
  protected searchQuery = '';
  protected currentTheme: 'light' | 'dark' = 'dark';
  protected showGlobalHeader = true;
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      this.currentTheme = stored;
    } else {
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      this.currentTheme = prefersLight ? 'light' : 'dark';
    }
    this.applyTheme();

    // Hide global header on landing route to prevent double headers
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url;
        this.showGlobalHeader = url !== '/' && url !== '';
      }
    });

    // Set initial state based on current URL
    const currentUrl = this.router.url;
    this.showGlobalHeader = currentUrl !== '/' && currentUrl !== '';
  }

  protected toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  protected onSearch(event: Event): void {
    event.preventDefault();
    const query = (this.searchQuery || '').trim();
    if (!query) return;
    console.log('Search query:', query);
  }
}
