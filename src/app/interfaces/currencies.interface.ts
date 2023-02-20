export interface CurrencyList {
  currencies: Record<string, string>,
  success: boolean;
}

export interface CurrencyConvert {
  date: string,
  historical: boolean,
  info: {
    quote: number,
    timestamp: number,
  },
  query: {
    amount: number,
    from: string,
    to: string,
  },
  result: number,
  success: boolean,
}

export interface Currency {
  currencyCode: string;
  currencyName: string;
}
