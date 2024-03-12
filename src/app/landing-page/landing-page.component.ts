import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1.5s ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('1s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class LandingPageComponent {
  isTextVisible: boolean = false;

  toggleTextVisibility() {
    this.isTextVisible = !this.isTextVisible;
  }
  imageUrls = [
    {
      url: '/assets/preview/IMG_6579.jpg',
      alt: 'Product 1',
      customInfo: 'Custom info for Product 1'
    },
    {
      url: '/assets/preview/IMG_9340.jpg',
      alt: 'Product 2',
      customInfo: 'Custom info for Product 2'
    },
    {
      url: '/assets/preview/IMG_9340.jpg',
      alt: 'Product 3',
      customInfo: 'Custom info for Product 3'
    },
  ];
  imageUrls2 = [
    {
      url: '/assets/preview/IMG_6579.jpg',
      alt: 'Product 1',
      customInfo: 'Custom info for Product 1'
    },
    {
      url: '/assets/preview/IMG_9340.jpg',
      alt: 'Product 2',
      customInfo: 'Custom info for Product 2'
    }
  ];
}
