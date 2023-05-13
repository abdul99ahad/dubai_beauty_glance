import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import { Cost } from 'src/app/interfaces/cost.interface';
import { CurrencyService } from 'src/app/services/currency.service';
import { ProductCartItem } from 'src/app/utilities/productCartItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  registerFormFields: any = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    contactNo: 'Contact No',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    subscribeNewsLetter: 'Subscribe',
  };

  public cost: Cost = {
    amount: 0,
    totalAmount: 0,
    discountAmount: 0,
  };

  cartList: Array<ProductCartItem>;

  public readonly currency: string;

  constructor(
    private cartService: CartService<ProductCartItem>,
    private currencyService: CurrencyService
  ) {
    this.currency = this.currencyService.selectedCurrency;
  }

  ngOnInit(): void {
    this.cartList = this.cartService.getItems();
    this.costCalculation();
  }

  costCalculation(): void {
    this.cost = {
      amount: 0,
      totalAmount: 0,
      discountAmount: 0,
    };
    this.cartList.forEach((item) => {
      this.cost.amount += item.price * item.quantity;
      this.cost.discountAmount +=
        (item.price - item.discount_price) * item.quantity;
      this.cost.totalAmount += item.discount_price * item.quantity;
    });

    this.cost.amount = parseFloat(this.cost.amount.toFixed(2));
    this.cost.discountAmount = parseFloat(this.cost.discountAmount.toFixed(2));
    this.cost.totalAmount = parseFloat(this.cost.totalAmount.toFixed(2));
  }

  updateItem(item: ProductCartItem): void {
    item.setQuantity(item.quantity);
    item.updateTotalPrice(item.quantity);
    this.updateCartItems();
  }

  private updateCartItems(): void {
    this.cartList = this.cartService.getItems();
    // this.totalProductItemsCount = this.cartService.itemCount();
    this.costCalculation();
  }
}
