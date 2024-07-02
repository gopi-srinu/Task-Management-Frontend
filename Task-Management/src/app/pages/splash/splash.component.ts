import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent {
  constructor(private router: Router) {}
  navigateTohomePage() {
    this.router.navigateByUrl('home');
  }
}
