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

  test: ProductVariantList;

  result: any;
  public constructor(
    private readonly route: ActivatedRoute,
    private readonly webApiService: WebApiService
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

          productDetail.productOptions.map((productOption) => {
            productOption.optionValue.image =
              this.webApiService.imgUrl + productOption.optionValue.image;
          });
          console.log(productDetail);

          //MOCK

          // productDetail.productOptions.push({
          //   quantity: 200,
          //   subtract_stock: 0,
          //   price_difference: '50.00',
          //   price_adjustment: 1,
          //   optionValue: {
          //     name: 'Skin 232',
          //     image:
          //       '/assets/uploads/option_values/M5BW6RBWh4u9sX6TGIvMpBen9SX20B4HGjoNd80U.jpg',
          //     option: {
          //       name: 'Option 100',
          //     },
          //   },
          // });
          //
          return productDetail;
        })
      )
      .subscribe((productDetail: ProductDetail) => {
        this.productDetail = productDetail;
        this.selectedQuantity = productDetail.min_order_quantity;
        this.updateBasePrice(
          this.productDetail.price,
          this.productDetail.discount_price
        );
        this.updateTotalPrice(this.selectedQuantity);
        this.manipulateProductOptionsJson();
        this.response = true;
        console.log(productDetail);
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
    console.log(productVariant);
    // console.log(this.productOptions);
    if (productVariant.price_adjustment == 1) {
      // Add to base price
      this.productDetail.price = (
        parseFloat(this.productBasePrice.price) +
        parseFloat(productVariant.price_difference)
      ).toString();
      this.totalPrice =
        parseFloat(this.productDetail.price) *
        this.productDetail.min_order_quantity;
      if (this.productBasePrice.discounted_price) {
        this.productDetail.discount_price = (
          parseFloat(this.productBasePrice.discounted_price) +
          parseFloat(productVariant.price_difference)
        ).toString();
        this.discountedTotalPrice =
          parseFloat(this.productDetail.discount_price) *
          this.productDetail.min_order_quantity;
      }
    } else {
      this.productDetail.price = (
        parseFloat(this.productBasePrice.price) -
        parseFloat(productVariant.price_difference)
      ).toString();
      this.totalPrice =
        parseFloat(this.productDetail.price) *
        this.productDetail.min_order_quantity;
      if (this.productBasePrice.discounted_price) {
        this.productDetail.discount_price = (
          parseFloat(this.productBasePrice.discounted_price) -
          parseFloat(productVariant.price_difference)
        ).toString();
        this.discountedTotalPrice =
          parseFloat(this.productDetail.discount_price) *
          this.productDetail.min_order_quantity;
      }
    }

    this.checkedOptions[productOptionIndex] = true;
    if (productVariant.optionValue.image)
      this.changeMainImage(
        productVariant.optionValue.image,
        productOptionIndex
      );
  }

  public filterProductVariants(productVariantOption: {
    option: string;
    productOptions: ProductOptions;
  }) {
    this.productOptions = [];
    console.log(this.productVariantOptionsUnique);
    this.productDetail.productOptions.forEach((e) => {
      if (productVariantOption.option == e.optionValue.option.name)
        this.productOptions.push({
          option: e.optionValue.option.name,
          productOptions: e,
        });
    });
  }

  private manipulateProductOptionsJson() {
    console.log(
      this.groupBy(this.productDetail.productOptions, 'optionValue.option.name')
    );
    this.test = this.groupBy(
      this.productDetail.productOptions,
      'optionValue.option.name'
    );

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
    // console.log(this.productVariantOptionsUnique);
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

  // private groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  //   arr.reduce((groups, item) => {
  //     (groups[key(item)] ||= []).push(item);
  //     return groups;
  //   }, {} as Record<K, T[]>);

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
