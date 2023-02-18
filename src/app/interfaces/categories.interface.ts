export interface Category {
  name: string;
  description: string;
  slug: string;
  image: string;
}

export interface CategoryWithChildren extends Category {
  childrenCategories: Array<CategoryWithChildren>;
}


