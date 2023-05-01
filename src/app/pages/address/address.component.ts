import { Component, OnInit } from '@angular/core';
import { AddressBook } from 'src/app/interfaces/address-book.interface';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  public addresses: Array<AddressBook>;

  constructor(private webApiService: WebApiService) {}

  ngOnInit(): void {
    this.webApiService.getAddressses().subscribe((address) => {
      this.addresses = address.data;
    });
  }
}
