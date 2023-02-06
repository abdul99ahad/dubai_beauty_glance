export interface Product {
  id?: string;
  slug: string;
  code?: string;
  name: string;
  description?: string;
  price: number;
  discount_price: number | null;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image: string;
  rating?: number;
}
