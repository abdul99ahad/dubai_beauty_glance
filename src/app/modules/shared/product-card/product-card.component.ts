import { Component, Input } from "@angular/core";

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
}
