export interface Category {
  name: string;
  description: string;
  slug: string;
  image: string;
}

export interface CategoryWithChildren extends Category {
  children_categories: Array<CategoryWithChildren>;
}


