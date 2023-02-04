import type { Method } from 'axios';

export interface IApiRoute {
  route: string;
  method: Method;
  routeParams: string[];
  queryParams: string[];
  name: string;
}
