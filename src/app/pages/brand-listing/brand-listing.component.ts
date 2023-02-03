import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/interfaces/product.interface';
// import { ProductService } from 'src/app/services/product.service';
import productsJson from '../../mock/products.json';
import { WebApiService } from 'src/app/services/web-api.service';
import { Brand } from 'src/app/interfaces/brand.interface';
@Component({
  selector: 'app-brands-listing',
  templateUrl: './brand-listing.component.html',
  styleUrls: ['./brand-listing.component.scss'],
})
export class BrandsListingComponent implements OnInit {
  @Input('title') title: string = 'BRANDS'; //TODO:
  // products: Product = <Product>productsJson;
  constructor(private webApiService: WebApiService) {}

  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image: 'bamboo-watch.jpg',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1001',
  //     code: 'nvklal433',
  //     name: 'Black Watch',
  //     description: 'Product Description',
  //     image: 'black-watch.jpg',
  //     price: 72,
  //     category: 'Accessories',
  //     quantity: 61,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1002',
  //     code: 'zz21cz3c1',
  //     name: 'Blue Band',
  //     description: 'Product Description',
  //     image: 'blue-band.jpg',
  //     price: 79,
  //     category: 'Fitness',
  //     quantity: 2,
  //     inventoryStatus: 'LOWSTOCK',
  //     rating: 3,
  //   },
  //   {
  //     id: '1003',
  //     code: '244wgerg2',
  //     name: 'Blue T-Shirt',
  //     description: 'Product Description',
  //     image: 'blue-t-shirt.jpg',
  //     price: 29,
  //     category: 'Clothing',
  //     quantity: 25,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1004',
  //     code: 'h456wer53',
  //     name: 'Bracelet',
  //     description: 'Product Description',
  //     image: 'bracelet.jpg',
  //     price: 15,
  //     category: 'Accessories',
  //     quantity: 73,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1005',
  //     code: 'av2231fwg',
  //     name: 'Brown Purse',
  //     description: 'Product Description',
  //     image: 'brown-purse.jpg',
  //     price: 120,
  //     category: 'Accessories',
  //     quantity: 0,
  //     inventoryStatus: 'OUTOFSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1006',
  //     code: 'bib36pfvm',
  //     name: 'Chakra Bracelet',
  //     description: 'Product Description',
  //     image: 'chakra-bracelet.jpg',
  //     price: 32,
  //     category: 'Accessories',
  //     quantity: 5,
  //     inventoryStatus: 'LOWSTOCK',
  //     rating: 3,
  //   },
  //   {
  //     id: '1007',
  //     code: 'mbvjkgip5',
  //     name: 'Galaxy Earrings',
  //     description: 'Product Description',
  //     image: 'galaxy-earrings.jpg',
  //     price: 34,
  //     category: 'Accessories',
  //     quantity: 23,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1008',
  //     code: 'vbb124btr',
  //     name: 'Game Controller',
  //     description: 'Product Description',
  //     image: 'game-controller.jpg',
  //     price: 99,
  //     category: 'Electronics',
  //     quantity: 2,
  //     inventoryStatus: 'LOWSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1009',
  //     code: 'cm230f032',
  //     name: 'Gaming Set',
  //     description: 'Product Description',
  //     image: 'gaming-set.jpg',
  //     price: 299,
  //     category: 'Electronics',
  //     quantity: 63,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 3,
  //   },
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image: 'bamboo-watch.jpg',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1001',
  //     code: 'nvklal433',
  //     name: 'Black Watch',
  //     description: 'Product Description',
  //     image: 'black-watch.jpg',
  //     price: 72,
  //     category: 'Accessories',
  //     quantity: 61,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1002',
  //     code: 'zz21cz3c1',
  //     name: 'Blue Band',
  //     description: 'Product Description',
  //     image: 'blue-band.jpg',
  //     price: 79,
  //     category: 'Fitness',
  //     quantity: 2,
  //     inventoryStatus: 'LOWSTOCK',
  //     rating: 3,
  //   },
  //   {
  //     id: '1003',
  //     code: '244wgerg2',
  //     name: 'Blue T-Shirt',
  //     description: 'Product Description',
  //     image: 'blue-t-shirt.jpg',
  //     price: 29,
  //     category: 'Clothing',
  //     quantity: 25,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1004',
  //     code: 'h456wer53',
  //     name: 'Bracelet',
  //     description: 'Product Description',
  //     image: 'bracelet.jpg',
  //     price: 15,
  //     category: 'Accessories',
  //     quantity: 73,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1005',
  //     code: 'av2231fwg',
  //     name: 'Brown Purse',
  //     description: 'Product Description',
  //     image: 'brown-purse.jpg',
  //     price: 120,
  //     category: 'Accessories',
  //     quantity: 0,
  //     inventoryStatus: 'OUTOFSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1006',
  //     code: 'bib36pfvm',
  //     name: 'Chakra Bracelet',
  //     description: 'Product Description',
  //     image: 'chakra-bracelet.jpg',
  //     price: 32,
  //     category: 'Accessories',
  //     quantity: 5,
  //     inventoryStatus: 'LOWSTOCK',
  //     rating: 3,
  //   },
  //   {
  //     id: '1007',
  //     code: 'mbvjkgip5',
  //     name: 'Galaxy Earrings',
  //     description: 'Product Description',
  //     image: 'galaxy-earrings.jpg',
  //     price: 34,
  //     category: 'Accessories',
  //     quantity: 23,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1008',
  //     code: 'vbb124btr',
  //     name: 'Game Controller',
  //     description: 'Product Description',
  //     image: 'game-controller.jpg',
  //     price: 99,
  //     category: 'Electronics',
  //     quantity: 2,
  //     inventoryStatus: 'LOWSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1009',
  //     code: 'cm230f032',
  //     name: 'Gaming Set',
  //     description: 'Product Description',
  //     image: 'gaming-set.jpg',
  //     price: 299,
  //     category: 'Electronics',
  //     quantity: 63,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 3,
  //   },
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image: 'bamboo-watch.jpg',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1001',
  //     code: 'nvklal433',
  //     name: 'Black Watch',
  //     description: 'Product Description',
  //     image: 'black-watch.jpg',
  //     price: 72,
  //     category: 'Accessories',
  //     quantity: 61,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1002',
  //     code: 'zz21cz3c1',
  //     name: 'Blue Band',
  //     description: 'Product Description',
  //     image: 'blue-band.jpg',
  //     price: 79,
  //     category: 'Fitness',
  //     quantity: 2,
  //     inventoryStatus: 'LOWSTOCK',
  //     rating: 3,
  //   },
  //   {
  //     id: '1003',
  //     code: '244wgerg2',
  //     name: 'Blue T-Shirt',
  //     description: 'Product Description',
  //     image: 'blue-t-shirt.jpg',
  //     price: 29,
  //     category: 'Clothing',
  //     quantity: 25,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1004',
  //     code: 'h456wer53',
  //     name: 'Bracelet',
  //     description: 'Product Description',
  //     image: 'bracelet.jpg',
  //     price: 15,
  //     category: 'Accessories',
  //     quantity: 73,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1005',
  //     code: 'av2231fwg',
  //     name: 'Brown Purse',
  //     description: 'Product Description',
  //     image: 'brown-purse.jpg',
  //     price: 120,
  //     category: 'Accessories',
  //     quantity: 0,
  //     inventoryStatus: 'OUTOFSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1006',
  //     code: 'bib36pfvm',
  //     name: 'Chakra Bracelet',
  //     description: 'Product Description',
  //     image: 'chakra-bracelet.jpg',
  //     price: 32,
  //     category: 'Accessories',
  //     quantity: 5,
  //     inventoryStatus: 'LOWSTOCK',
  //     rating: 3,
  //   },
  //   {
  //     id: '1007',
  //     code: 'mbvjkgip5',
  //     name: 'Galaxy Earrings',
  //     description: 'Product Description',
  //     image: 'galaxy-earrings.jpg',
  //     price: 34,
  //     category: 'Accessories',
  //     quantity: 23,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1008',
  //     code: 'vbb124btr',
  //     name: 'Game Controller',
  //     description: 'Product Description',
  //     image: 'game-controller.jpg',
  //     price: 99,
  //     category: 'Electronics',
  //     quantity: 2,
  //     inventoryStatus: 'LOWSTOCK',
  //     rating: 4,
  //   },
  //   {
  //     id: '1009',
  //     code: 'cm230f032',
  //     name: 'Gaming Set',
  //     description: 'Product Description',
  //     image: 'gaming-set.jpg',
  //     price: 299,
  //     category: 'Electronics',
  //     quantity: 63,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 3,
  //   },
  // ];
  brands: Brand[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  ngOnInit(): void {
    // this.products = this.productService
    //   .getProducts()
    //   .then((products) => (this.products = products));

    this.webApiService.getBrands().subscribe((data) => {
      this.brands = data.data;
      this.brands.forEach((brand) => {
        brand.brand_image = this.webApiService.imgUrl + brand.brand_image;
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