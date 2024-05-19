import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import {Product} from "../Product";
import {animate, style, transition, trigger} from "@angular/animations";
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthorizationService} from "../services/authorization.service";
import {HttpService} from "../services/http.service";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
          filter: 'blur(2px)'
        }),
        animate('0.3s ease-in-out',
          style({
            opacity: 1,
            filter: 'blur(0)'
          })),
      ]),
    ])
  ]
})
export class OrderPageComponent implements OnInit {
  product: Product | null = null;
  public productId: number | null = null;
  public withShipping: boolean = false;
  public confirmOrderCheckbox: boolean = false;
  public quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthorizationService,
    private jwtHelper: JwtHelperService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.httpService.get(`http://localhost:9191/api/product/${productId}`).subscribe({
        next: (product: Product) => {
          this.product = product;
        },
        error: (error: any) => {
          console.error('Error fetching product:', error);
        }
      });
    });
  }

  get price(): bigint | null {
    if (this.product && this.product.price) {
      return BigInt(this.quantity) * BigInt(this.product.price);
    }
    return null;
  }

  confirmOrder(): void {
    if (this.authService.isLoggedIn()) {
      const token = this.authService.getJwtAccessToken();
      if (token != null) {
        const userId = this.jwtHelper.decodeToken(token).id;
        const orderItem = {
          productId: this.product?.id,
          quantity: this.quantity
        }
        const orderRequest = {
          price: this.price ? this.price.toString() : null,
          withShipping: this.withShipping,
          userId: userId,
          items: [orderItem]
        };

        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`);

        this.http.post('http://localhost:9191/api/order', orderRequest, {headers}).subscribe({
          next: (response: any) => {
            console.log('Order placed successfully:', response);
            this.openInfoDialog('Замовлення створено успішно', '/');
          },
          error: (error: any) => {
            console.error('Error placing order:', error);
          }
        });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  openInfoDialog(message: string, navigatePath?: string): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {message: message, navigatePath: navigatePath}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([result]);
      }
    });
  }
}
