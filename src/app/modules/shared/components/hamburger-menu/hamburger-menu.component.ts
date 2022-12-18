import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent implements OnInit {
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
  constructor() {}

  ngOnInit(): void {}
}
