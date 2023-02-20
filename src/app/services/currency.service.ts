import { Subject } from "rxjs";
import { Currency } from "../interfaces/currencies.interface";

export class CurrencyService {
  private readonly currencySubject = new Subject<Currency>();

  public setNewCurrency(currency: Currency): void {
    this.currencySubject.next(currency);
  }

  public observeCurrency(): Subject<Currency> {
    return this.currencySubject;
  }
}
