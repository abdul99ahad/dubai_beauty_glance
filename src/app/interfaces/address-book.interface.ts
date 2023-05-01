export interface AddressBook {
  id?: number;
  first_name?: string;
  last_name?: string;
  address_line_one: string;
  address_line_two: string;
  address_city: string;
  address_state: string;
  address_country: string;
  address_zip_code: string;
  is_default: boolean;
}
