import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from '../../services/web-api.service';
import { map } from 'rxjs';
import {
  Price,
  ProductDetail,
  ProductOptions,
  ProductVariantList,
} from '../../interfaces/product.interface';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CurrencyService } from '../../services/currency.service';
import { CartService } from 'ng-shopping-cart';
import { ProductCartItem } from 'src/app/utilities/productCartItem';

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
  variantSelectedIndex: number;

  public checkedOptions: SelectedProductOption = {};

  public productDetail: ProductDetail;

  public productBasePrice: Price;

  response: boolean = false;

  productVariants: ProductVariantList;

  description: SafeHtml;
  public readonly currency: string;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly webApiService: WebApiService,
    private sanitizer: DomSanitizer,
    private readonly currencyService: CurrencyService,
    private cartService: CartService<ProductCartItem>
  ) {
    this.currency = this.currencyService.selectedCurrency;
  }

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

          productDetail.productOptions.map((productOption) => {
            productOption.optionValue.image =
              this.webApiService.imgUrl + productOption.optionValue.image;
          });
          return productDetail;
        })
      )
      .subscribe((productDetail: ProductDetail) => {
        this.productDetail = productDetail;
        this.description = this.sanitizer.bypassSecurityTrustHtml(
          productDetail.description
        );
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

  public AddtoCart() {
    this.cartService.addItem(
      new ProductCartItem({
        id: this.productDetail.sku,
        name: this.productDetail.name,
        image: this.productDetail.image,
        price: this.productDetail.price,
        quantity: this.selectedQuantity,
        discount_price: this.productDetail.discount_price,
        min_quantity: this.productDetail.min_order_quantity,
      })
    );
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

  public toggleProductOptionSelection(productOption: ProductOptions): void {
    const productOptionIndex: number =
      this.productDetail.productOptions.findIndex((x) => x == productOption);
    // if (this.checkedOptions[productOptionIndex]) {
    //   this.checkedOptions[productOptionIndex] =
    //     !this.checkedOptions[productOptionIndex];
    //   return;
    // }

    if (productOption.price_adjustment == 1) {
      // Add to base price
      this.productDetail.price = (
        parseFloat(this.productBasePrice.price) +
        parseFloat(productOption.price_difference)
      ).toString();
      if (this.productBasePrice.discounted_price) {
        this.productDetail.discount_price = (
          parseFloat(this.productBasePrice.discounted_price) +
          parseFloat(productOption.price_difference)
        ).toString();
      }
    } else {
      this.productDetail.price = (
        parseFloat(this.productBasePrice.price) -
        parseFloat(productOption.price_difference)
      ).toString();
      if (this.productBasePrice.discounted_price) {
        this.productDetail.discount_price = (
          parseFloat(this.productBasePrice.discounted_price) -
          parseFloat(productOption.price_difference)
        ).toString();
      }
    }

    this.updateTotalPrice(this.selectedQuantity);

    this.checkedOptions[productOptionIndex] = true;
    if (productOption.optionValue.image)
      this.changeMainImage(productOption.optionValue.image, productOptionIndex);
  }

  private manipulateProductOptionsJson() {
    this.productVariants = this.groupBy(
      this.productDetail.productOptions,
      'optionValue.option.name'
    );
  }

  public changeMainImage(source: string, index: number): void {
    this.productDetail.image = source;
    this.variantSelectedIndex = index;
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

  private groupBy = (arrayToGroup: any, byKey: string) => {
    const groupedMap: any = {};

    const props = byKey.split('.');
    for (let item of arrayToGroup) {
      const valueToGroupBy = props.reduce((reducedItem, currentProp) => {
        return reducedItem[currentProp];
      }, item);

      const groupedItemsByCurrentValue = groupedMap[valueToGroupBy];
      if (groupedItemsByCurrentValue) {
        groupedItemsByCurrentValue.push(item);

        continue;
      }

      groupedMap[valueToGroupBy] = [item];
    }

    return groupedMap;
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
}
