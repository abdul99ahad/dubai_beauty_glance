export interface Response1<T> {
  data: Array<T>;
  links: {
    first: string;
    last: string;
    next?: string;
    prev?: string;
  };
}
