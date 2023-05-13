export interface OrderDetailsHistory {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_email: string;
  shipping_contact: string;
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
  order_comment: string;
  order_status: string;
  payment_method: string;
  shipping_method: string;
  actual_amount: string;
  discount_amount: string;
  shipping_amount: string;
  total_amount: string;
  orderItems: OrderItem[];
}

export interface BillingAddress {
  addressLineOne: string;
  addressLineTwo: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  addressZipCode: string;
}

export interface ShippingAddress {
  addressLineOne: string;
  addressLineTwo: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  addressZipCode: string;
}

export interface OrderItem {
  product_name: string;
  product_option_name: ProductOptionName;
  product_quantity: number;
  product_weight: string;
  product_weight_class: string;
  product_dimension: ProductDimension;
  product_dimension_class: string;
  product_image: string;
  product_price: string;
  product_total_price: string;
}

export interface ProductOptionName {
  optionName: string;
  optionValueName: string;
}

export interface ProductDimension {
  dimensionLength: number;
  dimensionWidth: number;
  dimensionHeight: number;
}
