import { PersonalDetails } from './personaldetails.interface';

export interface JwtDecode {
  iss: string;
  iat: number;
  exp: number;
  nbf: number;
  jti: string;
  sub: string;
  prv: string;
  customer: PersonalDetails;
}
