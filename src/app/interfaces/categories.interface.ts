export interface Category {
  name: string;
  description: string;
  slug: string;
  image: string;
  childrenCategories: Category[];
}
