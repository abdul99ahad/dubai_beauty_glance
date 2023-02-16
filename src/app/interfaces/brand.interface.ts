import type { Product } from "./product.interface";

export interface Brand {
  name: string;
  slug: string;
  country_name: string;
  country_flag: string;
  country_code: string;
  brand_image: string;
}

export interface BrandWithProducts extends Brand {
  products: Array<Product>;
}
