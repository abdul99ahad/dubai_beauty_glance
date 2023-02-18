export interface Currencies {
  currencies: Record<string, string>,
  success: boolean;
}

export interface Currency {
  currencyCode: string;
  currencyName: string;
}
