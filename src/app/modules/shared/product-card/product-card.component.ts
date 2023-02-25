import { Component, Input } from "@angular/core";
import { CurrencyService } from "../../../services/currency.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent {
  @Input("name") name: string;
  @Input("slug") slug: string;
  @Input("price") price: string;
  @Input("discount_price") discount_price: string | null;
  @Input("image") image: string;

  public readonly currency: string;

  public constructor(private readonly currencyService: CurrencyService) {
    this.currency = this.currencyService.selectedCurrency;
  }
}
