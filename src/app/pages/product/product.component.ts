import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from '../../services/web-api.service';
import { map } from 'rxjs';
import { ProductDetail } from '../../interfaces/product.interface';
import { BeforeSlideDetail } from 'lightgallery/lg-events';

type SelectedProductOption = { [productOptionIndex: number]: boolean };

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public selectedQuantity: number;
  public totalPrice = 0.0;
  public discountedTotalPrice = 0.0;

  checked: boolean = true;
  display: boolean = false;
  selectedIndex: number;

  public checkedOptions: SelectedProductOption = {};

  public productDetail: ProductDetail;

  response: boolean = false;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly webApiService: WebApiService
  ) {}

  public ngOnInit(): void {
    this.fetchProductDetails();
  }

  /*public populateDescription(): void {
    const productDescription = document.getElementById('productDescription');
    productDescription!.innerHTML += this.productDetail.description;
  }*/

  public fetchProductDetails(): void {
    const productSlug = this.route.snapshot.paramMap.get('slug');
    if (!productSlug) throw new Error('Product slug unavailable!');

    this.webApiService
      .getProductDetails(productSlug)
      .pipe(
        map((response: { data: ProductDetail }) => response.data),
        map((productDetail: ProductDetail) => {
          productDetail.image = this.webApiService.imgUrl + productDetail.image;
          productDetail.secondary_images = productDetail.secondary_images.map(
            (imgs) => this.webApiService.imgUrl + imgs
          );
          productDetail.secondary_images.push(productDetail.image);
          productDetail.relatedProducts.map((relatedProduct) => {
            relatedProduct.image =
              this.webApiService.imgUrl + relatedProduct.image;
          });
          productDetail.brand.country_flag =
            this.webApiService.imgUrl + productDetail.brand.country_flag;
          return productDetail;
        })
      )
      .subscribe((productDetail: ProductDetail) => {
        this.productDetail = productDetail;
        /*this.populateDescription();
        this.selectedQuantity = productDetail.min_order_quantity;
        this.updateTotalPrice(this.selectedQuantity);*/
        this.response = true;
      });
  }

  @HostListener('wheel', ['$event'])
  public onMousewheel(event: WheelEvent): void {
    this.display = event.pageY > event.view!.outerHeight * 1.5;
  }

  public quantityUp(): void {
    this.selectedQuantity++;
    this.updateTotalPrice(this.selectedQuantity);
  }

  public quantityDown(): void {
    if (this.selectedQuantity > this.productDetail.min_order_quantity) {
      this.selectedQuantity--;
      this.updateTotalPrice(this.selectedQuantity);
    }
  }

  public toggleProductOptionSelection(productOptionIndex: number): void {
    if (this.checkedOptions[productOptionIndex]) {
      this.checkedOptions[productOptionIndex] =
        !this.checkedOptions[productOptionIndex];

      return;
    }

    this.checkedOptions[productOptionIndex] = true;
  }

  public changeMainImage(source: string, index: number): void {
    this.productDetail.image = source;
    this.selectedIndex = index;
  }

  public updateTotalPrice(quantity: number): void {
    if (quantity <= 0) return;

    const productPrice = this.productDetail.discount_price
      ? +this.productDetail.discount_price
      : +this.productDetail.price;

    this.totalPrice = parseFloat(
      (+this.productDetail.price * quantity).toFixed(2)
    );
    this.discountedTotalPrice = parseFloat(
      (productPrice * quantity).toFixed(2)
    );
  }

  settings = {
    counter: false,
    // plugins: [lgZoom],
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
}
