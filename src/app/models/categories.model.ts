export interface Category {
  category_id: number;
  name: string;
  description?: any;
  meta_tag_title: string;
  meta_tag_description?: any;
  meta_tag_keywords?: any;
  slug: string;
  sort_order: number;
  image?: any;
  type: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: any;
  children_categories: Category[];
}
