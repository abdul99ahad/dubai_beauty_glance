import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  title: string = 'Contact Us';
  adImgUrl: string = '../../../assets/topbanner08552.jpg';
  constructor() {}

  ngOnInit(): void {}
}
