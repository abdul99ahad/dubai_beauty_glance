import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from '../../services/web-api.service';
import { map } from 'rxjs';
import {
  Price,
  ProductDetail,
  ProductOptions,
} from '../../interfaces/product.interface';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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

  public productBasePrice: Price;

  response: boolean = false;

  productOptions: Array<{ option: string; productOptions: ProductOptions }> =
    [];

  productVariantOptionsUnique: Array<{
    option: string;
    productOptions: ProductOptions;
  }>;

  description: SafeHtml;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly webApiService: WebApiService,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.fetchProductDetails();
  }

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
          productDetail.secondary_images.unshift(productDetail.image);
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
        this.description = this.sanitizer.bypassSecurityTrustHtml(productDetail.description);
        this.selectedQuantity = productDetail.min_order_quantity;
        this.updateBasePrice(
          this.productDetail.price,
          this.productDetail.discount_price
        );
        this.updateTotalPrice(this.selectedQuantity);
        this.manipulateProductOptionsJson();
        this.response = true;
      });
  }

  @HostListener('wheel', ['$event'])
  public onMousewheel(event: WheelEvent): void {
    this.display = event.pageY > event.view!.outerHeight * 1.5;
  }

  public updateBasePrice(price: string, discounted_price: string | null) {
    this.productBasePrice = {
      price,
      discounted_price,
    };
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

    const productVariant =
      this.productDetail.productOptions[productOptionIndex];
    if (productVariant.price_adjustment == 1) {
      // Add to base price
      this.productDetail.price = (
        parseFloat(this.productBasePrice.price) +
        parseFloat(productVariant.price_difference)
      ).toString();
      this.totalPrice = parseFloat(this.productDetail.price);
      if (this.productBasePrice.discounted_price) {
        this.productDetail.discount_price = (
          parseFloat(this.productBasePrice.discounted_price) +
          parseFloat(productVariant.price_difference)
        ).toString();
        this.discountedTotalPrice = parseFloat(
          this.productDetail.discount_price
        );
      }
    }
    this.checkedOptions[productOptionIndex] = true;
  }

  public filterProductVariants(productVariantOption: {
    option: string;
    productOptions: ProductOptions;
  }) {
    this.productOptions = [];
    this.productDetail.productOptions.forEach((e) => {
      if (productVariantOption.option == e.optionValue.option.name)
        this.productOptions.push({
          option: e.optionValue.option.name,
          productOptions: e,
        });
    });
  }

  private manipulateProductOptionsJson() {
    this.productDetail.productOptions.forEach((e) => {
      this.productOptions.push({
        option: e.optionValue.option.name,
        productOptions: e,
      });
    });
    this.productVariantOptionsUnique = this.productOptions.filter(
      (item, index, objects) => {
        if (index === 0) {
          return item;
        } else if (item.option !== objects[index - 1].option) {
          return item;
        }
        return;
      }
    );
    this.filterProductVariants(this.productVariantOptionsUnique[0]);
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

  private groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    }, {} as Record<K, T[]>);

  settings = {
    counter: false,
    // plugins: [lgZoom],
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
}
