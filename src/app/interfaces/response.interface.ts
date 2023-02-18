export interface PaginatedResponse<T> {
  data: Array<T>;
  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
  meta: {
    from: number;
    to: number;
    current_page: number;
    last_page: number;
    path: string;
    per_page: number;
    total: number;
    links: Array<IPageButton>;
  };
}

export interface IPageButton {
  active: boolean;
  label: string;
  url: string | null;
}
