import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";
import {HttpService} from "../services/http.service";
import {AuthorizationService} from "../services/authorization.service";
import {forkJoin, map, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ProductReview} from "../ProductReview";
import {UserBasicInfo} from "../UserBasicInfo";
import {Product} from "../Product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-view-page',
  templateUrl: './product-view-page.component.html',
  styleUrls: ['./product-view-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0, filter: 'blur(2px)'}),
        animate('0.3s ease-in-out', style({opacity: 1, filter: 'blur(0)'})),
      ]),
    ])
  ]
})
export class ProductViewPageComponent implements OnInit {
  showReviewForm = false;
  product: Product | null = null;
  reviews: Array<{
    review: ProductReview,
    user: UserBasicInfo
  }> = [];
  reviewForm: FormGroup;

  constructor(
      private fb: FormBuilder, // Inject FormBuilder
      private route: ActivatedRoute,
      private router: Router,
      private httpService: HttpService,
      public authService: AuthorizationService
  ) {
    // Initialize the form group
    this.reviewForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      if (productId) {
        this.httpService.get(`http://localhost:9191/api/product/${productId}`).subscribe(product => {
          this.product = product;
          this.loadReviews(productId);
        });
      }
    });
  }

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm; // Toggle the visibility state
    if (this.showReviewForm) {
      this.reviewForm.reset(); // Optionally reset the form when opened
    }
  }

  loadReviews(productId: number): void {
    this.httpService.get(`http://localhost:9191/api/product/review/product/${productId}`).pipe(
        switchMap((reviews: any[]) => {
          // Assuming the reviews are expected to be an array of any
          if (reviews.length > 0) {
            return forkJoin(
                reviews.map((review: any) => {
                  return this.httpService.get(`http://localhost:9191/api/users/basic-info/${review.userId}`)
                  .pipe(
                      map((user: any) => ({
                        review: new ProductReview(review.id, review.userId, review.comment),
                        user: new UserBasicInfo(user.name, user.email)
                      }))
                  );
                })
            );
          }
          return of([]);
        })
    ).subscribe((results: Array<{
      review: ProductReview,
      user: UserBasicInfo
    }>) => {
      this.reviews = results;
    });
  }

  submitReview(): void {
    const userId = this.authService.getCurrentUserId();
    if (this.product && this.product.id !== null && userId !== null && this.reviewForm.valid) {
      const review = {
        productId: this.product.id,
        userId: userId,
        comment: this.reviewForm.value.comment
      };
      this.httpService.post(`http://localhost:9191/api/product/review`, review).subscribe(() => {
        this.reviewForm.reset();
        if (this.product && this.product.id !== null)
          this.loadReviews(this.product.id);
      });
    } else {
      // Optionally handle the case where userId is null
      console.error('User ID is null or product details are incomplete.');
    }
  }

  buyProduct(): void {
    if (this.authService.isLoggedIn()) {
      if (this.product) {
        this.router.navigate(['/order', this.product.id]);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
