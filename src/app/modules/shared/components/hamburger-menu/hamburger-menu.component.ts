import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../interfaces/categories.interface';
import { WebApiService } from 'src/app/services/web-api.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent implements OnInit {
  @Output() clickEvent = new EventEmitter<string>();
  subHeading: any = 'Cleansers';
  invisible: string = '‎';
  categoryItems: any = [
    {
      text: 'Face Wash',
      url: '',
    },
    {
      text: 'Face Cleanser',
      url: '',
    },
    {
      text: 'Body Wash',
      url: '',
    },
    {
      text: 'Lotions',
      url: '',
    },
    {
      text: 'Makeup Removals',
      url: '',
    },
  ];

  categoryItemsHeirarchy: any = [
    {
      mainHeading: true,
      item: 'Skincare',
      child: [
        {
          item: 'Cleansers',
          child: [
            {
              item: 'FaceWash',
              child: [],
            },
            {
              item: 'Exfoliators',
              child: [],
            },
          ],
        },
        {
          item: 'Moisturizers',
          child: [
            {
              item: 'Toners',
              child: [],
            },
          ],
        },
        {
          item: 'Masks',
          child: [
            {
              item: 'Toners',
              child: [],
            },
          ],
        },
        {
          item: 'Suncare',
          child: [
            {
              item: 'Toners',
              child: [],
            },
          ],
        },
      ],
    },
  ];

  categorysubItems: string[] = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15',
    'Item 16',
    'Item 17',
    'Item 18',
    'Item 19',
    'Item 20',
  ];

  categories: Category[];
  constructor(private webApiService: WebApiService) {}

  ngOnInit(): void {
    this.webApiService.getCategories().subscribe((category) => {
      this.categories = category.data;
      console.log(category.data);
    });
  }

  categoryClick() {
    this.clickEvent.emit();
  }
}
