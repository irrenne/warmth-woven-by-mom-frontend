import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {trigger, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
          filter: 'blur(5px)'
        }),
        animate('1.5s ease-out',
          style({
            opacity: 1,
            filter: 'blur(0)'
          })),
      ]),
    ]),
    trigger('slideRight', [
      transition(':enter', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate('2.2s ease-in-out', style({transform: 'translateX(0)', opacity: 1})),
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
