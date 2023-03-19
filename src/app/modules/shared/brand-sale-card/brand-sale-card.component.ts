import { Component, Input } from "@angular/core";

@Component({
  selector: "app-brand-sale-card",
  templateUrl: "./brand-sale-card.component.html",
  styleUrls: ["./brand-sale-card.component.scss"],
})
export class BrandSaleCardComponent {
  @Input("imgSrc") public imgSrc: string = "";
  @Input("link") link: string = "javascript:void(0)";
}
