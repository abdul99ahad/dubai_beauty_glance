import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import { CheckoutAddress } from 'src/app/interfaces/checkout-address.interface';
import { Cost } from 'src/app/interfaces/cost.interface';
import { PersonalDetails } from 'src/app/interfaces/personaldetails.interface';
import { CurrencyService } from 'src/app/services/currency.service';
import { ProductCartItem } from 'src/app/utilities/productCartItem';
import { countries } from '../../utilities/countries';
import { Enum } from 'src/app/interfaces/enum.interface';
import { WebApiService } from 'src/app/services/web-api.service';
import {
  Checkout,
  OrderDetails,
  OrderItem,
} from 'src/app/interfaces/checkout.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AddressBook } from 'src/app/interfaces/address-book.interface';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/interfaces/user-login.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  selectedOption: string = 'Register';
  passwordFieldsEnable: boolean = true;
  logInFieldsEnable: boolean = false;
  isUserLoggedInLocal: boolean;
  registerFormFields: any = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    contactNo: 'Contact No',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    subscribeNewsLetter: 'Subscribe',
  };

  logInDetails: UserLogin = {
    email: '',
    password: '',
  };

  billingDetailsForm: PersonalDetails = {
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
  };

  shippingDetailsForm: PersonalDetails = {
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
  };

  billingAddressForm: AddressBook = {
    address_line_one: '',
    address_line_two: '',
    address_city: '',
    address_country: 'Pakistan',
    address_state: '',
    address_zip_code: '',
  };

  shippingAddressForm: AddressBook = {
    address_line_one: '',
    address_line_two: '',
    address_city: '',
    address_country: 'Pakistan',
    address_state: '',
    address_zip_code: '',
  };

  response: boolean = true;
  orderSuccessDialogBox: boolean = false;
  wantToUseExistingAddressBoolean: boolean = true;
  wantToUseExistingShippingAddressBoolean: boolean = true;

  checkOnSubmit: boolean = false;
  existingAddresses: Array<AddressBook> = [];
  selectedAddress: AddressBook;
  billingDetailsSameAsShippingDetails: boolean = false;
  billingAddressSameAsShippingAddress: boolean = true;

  public cost: Cost = {
    amount: 0,
    totalAmount: 0,
    discountAmount: 0,
  };

  shippingCost: number = 15;

  countryList: Array<string> = countries;
  cartList: Array<ProductCartItem>;
  paymentMethods: Array<Enum>;
  shippingMethods: Array<Enum>;
  public readonly currency: string;

  selectedPaymentMethod: Enum;
  selectedShippingMethod: Enum;

  checkoutOrder: Checkout;

  orderItems: Array<OrderItem> = [];

  orderDetails: OrderDetails = {
    comment: '',
    shipping_method: 0,
    payment_method: 0,
  };

  termsAndConditionsChecked: boolean = false;
  loggedInUserPersonalDetailsFetched: boolean = false;
  constructor(
    private cartService: CartService<ProductCartItem>,
    private currencyService: CurrencyService,
    private webApiService: WebApiService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currency = this.currencyService.selectedCurrency;
    this.billingDetailsForm = this.autoPopulateUserData();
    this.shippingDetailsForm = this.autoPopulateUserData(); //TODO
    this.autoPopulateAddressData();
    this.isUserLoggedInLocal = this.authService.isUserLoggedIn();
  }

  ngOnInit(): void {
    this.cartList = this.cartService.getItems();
    this.cartList.forEach((item) => {
      this.orderItems.push({
        slug: item.slug,
        quantity: item.quantity,
        option_id: item.option_id ? item.option_id : null,
      });
    });
    this.costCalculation();
    this.webApiService.getPaymentMethods().subscribe((response) => {
      this.paymentMethods = response.data;
      this.selectedPaymentMethod = this.paymentMethods[0];
    });
    this.webApiService.getShippingMethods().subscribe((response) => {
      this.shippingMethods = response.data;
      this.selectedShippingMethod = this.shippingMethods[0];
    });
    if (this.authService.isUserLoggedIn()) {
      this.updateBillingAndShippingDetails(); // In case of user logged in.
      this.setAddressDetails(this.existingAddresses[0]);
    }
    // User details auto populate in case of login
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
    this.orderItems = [];
    this.cartList.forEach((item) => {
      this.orderItems.push({
        slug: item.slug,
        quantity: item.quantity,
        option_id: item.option_id ? item.option_id : null,
      });
    });
    this.costCalculation();
  }

  public updateBillingAndShippingDetails(): void {
    if (this.billingDetailsSameAsShippingDetails) {
      this.shippingDetailsForm = { ...this.billingDetailsForm };
    }
  }

  public updateBillingAndShippingAddress(): void {
    if (this.billingAddressSameAsShippingAddress) {
      this.shippingAddressForm = { ...this.billingAddressForm };
    }
  }

  private autoPopulateUserData(): PersonalDetails {
    if (this.authService.isUserLoggedIn()) {
      this.loggedInUserPersonalDetailsFetched = true;
      return this.authService.getUserLoginInfo();
    }
    return {
      first_name: '',
      last_name: '',
      email: '',
      contact: '',
    };
  }

  public resetBillingDetailsForm(): void {
    this.billingAddressForm = {
      address_line_one: '',
      address_line_two: '',
      address_city: '',
      address_country: 'Pakistan',
      address_state: '',
      address_zip_code: '',
    };
  }

  public resetShippingAddressDetailsForm(): void {
    this.shippingAddressForm = {
      address_line_one: '',
      address_line_two: '',
      address_city: '',
      address_country: 'Pakistan',
      address_state: '',
      address_zip_code: '',
    };
  }

  private autoPopulateAddressData(): void {
    if (this.authService.isUserLoggedIn()) {
      this.webApiService.getAddressses().subscribe((response) => {
        this.existingAddresses = response.data;
        // console.log(this.existingAddresses);
        this.setAddressDetails(this.existingAddresses[0]);
      });
    }
  }

  public onExistingAddressChange(e: {
    originalEvent: any;
    value: AddressBook;
  }) {
    this.billingAddressForm = e.value;
    // this.setAddressDetails();
  }

  public onExistingShippingAddressChange(e: {
    originalEvent: any;
    value: AddressBook;
  }) {
    this.shippingAddressForm = e.value;
    // this.setAddressDetails();
  }

  public setAddressDetails(address: AddressBook) {
    if (address == undefined) {
      address = this.existingAddresses[0];
    }
    this.billingAddressForm = address;
    if (this.billingAddressSameAsShippingAddress)
      this.updateBillingAndShippingAddress();
  }
  public setShippingCharges(shippingMethod: Enum) {
    if (shippingMethod.name == 'FREE_SHIPPING') this.shippingCost = 0;
    else this.shippingCost = 15;
  }

  public setOptions(option: string) {
    if (option == 'Login') {
      this.passwordFieldsEnable = false;
      this.logInFieldsEnable = true;
    } else if (option == 'Register') {
      this.passwordFieldsEnable = true;
      this.logInFieldsEnable = false;
    } else if (option == 'Guest') {
      this.passwordFieldsEnable = false;
      this.logInFieldsEnable = false;
    }
  }

  public confirmOrder() {
    if (
      this.billingAddressForm.address_line_one == '' ||
      this.billingAddressForm.address_city == '' ||
      this.billingAddressForm.address_state == '' ||
      this.billingAddressForm.address_zip_code == '' ||
      this.shippingAddressForm.address_line_one == '' ||
      this.shippingAddressForm.address_city == '' ||
      this.shippingAddressForm.address_state == '' ||
      this.shippingAddressForm.address_zip_code == '' ||
      !this.termsAndConditionsChecked
    ) {
      this.checkOnSubmit = true;
      console.log('Form incomplete');
      return;
    }
    this.response = false;
    console.log(this.termsAndConditionsChecked);
    if (this.billingAddressSameAsShippingAddress)
      this.updateBillingAndShippingAddress();
    this.orderDetails.payment_method = this.selectedPaymentMethod.value;
    this.orderDetails.shipping_method = this.selectedShippingMethod.value;

    this.checkoutOrder = {
      order_items: this.orderItems,
      receiver_details: {
        billing: this.billingDetailsForm,
        shipping: this.shippingDetailsForm,
      },
      address_details: {
        billing: this.billingAddressForm,
        shipping: this.shippingAddressForm,
      },
      order_details: this.orderDetails,
    };

    console.log(this.authService.getUserLoginInfo());
    console.log(this.checkoutOrder);

    // Send to API
    this.webApiService.createOrder(this.checkoutOrder).subscribe((response) => {
      this.response = true;
      this.orderSuccessDialogBox = true;
      this.cartService.clear();
      console.log(response);
      this.router.navigate(['/']);
    });
  }
}
