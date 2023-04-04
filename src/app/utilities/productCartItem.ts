import { BaseCartItem, CartItem } from 'ng-shopping-cart';

export class ProductCartItem extends BaseCartItem {
  public discount_price: number;
  public min_quantity: number;
  public getDiscountedPrice() {
    return this.discount_price;
  }

  public setDiscountedPrice(discount_price: number) {
    this.discount_price = discount_price;
  }

  constructor(itemData?: any) {
    super(itemData);
    this.discount_price = itemData.discount_price
      ? itemData.discount_price
      : itemData.price;
    this.min_quantity = itemData.min_quantity;
  }
  // constructor(
  //   id: string,
  //   name: string,
  //   price: number,
  //   quantity: number,
  //   discount_price: number
  // ) {
  //   super();
  //   this.id = id;
  //   this.name = name;
  //   this.price = price;
  //   this.quantity = quantity;
  //   this.discount_price = discount_price;
  // }
}
