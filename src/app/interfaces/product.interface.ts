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
  description: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  sku: string;
  upc: string;
  quantity: number;
  secondary_images: Array<string>;
  min_order_quantity: number;
  promotion_status: boolean;
  related_products: Array<Product>;
  brand: Brand;
  tags: Array<Tag>;
  categories: Array<Omit<Category, 'childrenCategories'>>;
  optionValues: Array<ProductOption>;
}

export interface ProductOption {
  image: null | string;
  name: string;
  option: Option;
}

export interface Option {
  name: string;
}
