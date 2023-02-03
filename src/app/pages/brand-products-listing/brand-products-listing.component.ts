import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import productsJson from '../../mock/products.json';
import { WebApiService } from 'src/app/services/web-api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-brand-products-listing',
  templateUrl: './brand-products-listing.component.html',
  styleUrls: ['./brand-products-listing.component.scss'],
})
export class BrandProductListingComponent implements OnInit {
  @Input('title') title: string = 'PRODUCTS'; //TODO:
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private webApiService: WebApiService
  ) {}

  products: Product[];
  productList: any = [];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.webApiService.getBrandProducts(id).subscribe((data) => {
      this.products = data.data;
      this.products.forEach((prod) => {
        prod.image = this.webApiService.imgUrl + prod.image;
      });
    });
  }

  onSortChange(event: any) {
    // let value = event.value;
    let value = '!price';
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
