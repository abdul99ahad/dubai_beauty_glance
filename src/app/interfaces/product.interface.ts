import { Brand } from './brand.interface';
import { Tag } from './tag.interface';
import { Category } from './categories.interface';

export interface Product {
  name: string;
  slug: string;
  price: string;
  discount_price: string | null;
  image: string;
  brand: Brand;
}

export interface ProductDetail extends Product {
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  sku: string;
  upc: string;
  quantity: number;
  secondary_images: Array<string>;
  min_order_quantity: number;
  promotion_status: boolean;
  relatedProducts: Array<Product>;
  brand: Brand;
  tags: Array<Tag>;
  categories: Array<Omit<Category, 'childrenCategories'>>;
  productOptions: Array<ProductOptions>;
}

export interface ProductOptions {
  quantity: number;
  subtract_stock: number;
  price_difference: string;
  price_adjustment: number;
  optionValue: OptionValue;
}
export interface OptionValue {
  image: null | string;
  name: string;
  option: Option;
}

export interface Option {
  name: string;
}

export interface Price {
  price: string;
  discounted_price: string | null;
}
