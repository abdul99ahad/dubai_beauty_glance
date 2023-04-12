import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import {
  Price,
  Product,
  ProductDetail,
  ProductOptions,
  ProductVariantList,
} from 'src/app/interfaces/product.interface';
import { ProductCartItem } from 'src/app/utilities/productCartItem';
import { CurrencyService } from '../../../../services/currency.service';
type SelectedProductOption = { [productOptionIndex: number]: boolean };
@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
})
export class ProductDescriptionComponent implements OnInit {
  @Input() currencyUsed: string = '$';
  @Input() selectedQuantity: number = 1;

  @Input() totalPrice: number = 0;
  @Input() productDetail: ProductDetail;
  @Input() productVariants: ProductVariantList;
  country: string = 'PK';
  checked: boolean = true;
  display: boolean = false;

  skus: any = [
    {
      productId: 1,
      sku: '2N Black',
      checked: false,
    },
    {
      productId: 1,
      sku: '6N Light Brown',
      checked: false,
    },
  ];
  price: number;
  discountedPrice: number;

  floatPrice: string;
  floatDiscountedPrice: string;
  public readonly currency: string;

  constructor(
    private readonly currencyService: CurrencyService,
    private cartService: CartService<ProductCartItem>
  ) {
    this.currency = this.currencyService.selectedCurrency;
  }

  ngOnInit(): void {
    console.log(this.productDetail);
    this.selectedQuantity = this.productDetail.min_order_quantity;
    this.updateBasePrice(
      this.productDetail.price,
      this.productDetail.discount_price
    );
    this.updateTotalPrice(this.selectedQuantity);
    this.manipulateProductOptionsJson();
    this.price = parseFloat(this.productDetail.price);
    this.discountedPrice = parseFloat(
      this.productDetail.discount_price
        ? this.productDetail.discount_price
        : '1'
    );

    this.floatPrice = this.price.toPrecision(4);
    this.floatDiscountedPrice = this.discountedPrice.toPrecision(4);
  }

  checkSkuItemTrue(item: any): void {
    // item.checked = true;
    this.skus[0].checked = false;
    // $('')
  }
  showDialog(): void {
    this.display = true;
  }

  private numberToFloat() {
    this.floatPrice = this.price.toPrecision(
      ((Math.log(this.price) * Math.LOG10E + 1) | 0) + 2
    );
    this.floatDiscountedPrice = this.discountedPrice.toPrecision(
      ((Math.log(this.discountedPrice) * Math.LOG10E + 1) | 0) + 2
    );
  }

  public discountedTotalPrice = 0.0;

  cartDisplay: boolean = false;
  selectedIndex: number;
  variantSelectedIndex: number = -1;

  public checkedOptions: SelectedProductOption = {};

  public productBasePrice: Price;

  response: boolean = false;

  ItemAddedToCartProduct: { name: string; image: string } = {
    name: '',
    image: '',
  };

  productVariantName: string;
  slug: string;

  private previousElement: HTMLElement;

  public AddtoCart(productDetail: ProductDetail) {
    this.cartDisplay = true;
    this.ItemAddedToCartProduct = {
      name: productDetail.name,
      image: productDetail.image,
    };
    // If already exists, increase the quantity
    if (
      this.cartService.getItem(this.productDetail.sku + this.productVariantName)
    ) {
      const product = this.cartService.getItem(
        this.productDetail.sku + this.productVariantName
      );
      product.setQuantity(product.quantity + this.selectedQuantity);
    } else {
      this.cartService.addItem(
        new ProductCartItem({
          id: this.productDetail.sku + this.productVariantName,
          name: this.productDetail.name,
          image: this.productDetail.image,
          price: this.productDetail.price,
          quantity: this.selectedQuantity,
          discount_price: this.productDetail.discount_price,
          min_quantity: this.productDetail.min_order_quantity,
          slug: this.slug,
        })
      );
    }
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
    // this.variantSelectedIndex = productOptionIndex;

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
    this.productVariantName = productOption.optionValue.name;
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

  public updateCss(event: Event): void {
    const clickedElement = event.target as HTMLElement;
    // If a previous element exists, revert its CSS back to the original state
    if (this.previousElement) {
      this.previousElement.style.border = 'none';
    }
    clickedElement.style.border = '1px solid red';

    this.previousElement = clickedElement;
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
  // onBeforeSlide = (detail: BeforeSlideDetail): void => {
  //   const { index, prevIndex } = detail;
  //   console.log(index, prevIndex);
  // };
}
