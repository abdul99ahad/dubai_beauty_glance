import { CheckoutAddress } from './checkout-address.interface';
import { PersonalDetails } from './personaldetails.interface';

export interface Checkout {
  order_items: Array<OrderItem>;
  receiver_details: ReceiverDetails;
  address_details: AddressDetails;
  order_details: OrderDetails;
}

export interface OrderItem {
  slug: string;
  quantity: number;
  option_id: number | null;
}

interface ReceiverDetails {
  create_account?: boolean;
  billing: PersonalDetails;
  shipping: PersonalDetails;
}

interface AddressDetails {
  billing: CheckoutAddress;
  shipping: CheckoutAddress;
}

export interface OrderDetails {
  comment: string;
  shipping_method: number;
  payment_method: number;
}
