import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  title: string = 'Contact Us';
  adImgUrl: string = 'https://jolse.com/web/images/topbanner08552.jpg';
  constructor() {}

  ngOnInit(): void {}
}
