import { Component, OnInit } from '@angular/core';
import { AddressBook } from 'src/app/interfaces/address-book.interface';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],
})
export class AddressBookComponent implements OnInit {
  public addressBook: AddressBook = {
    first_name: '',
    last_name: '',
    address_line_one: '',
    address_line_two: '',
    address_city: '',
    address_state: '',
    address_country: '',
    address_zip_code: '',
    is_default: false,
  };

  public mockAddress = {
    ...this.addressBook,
    address_state: 'Sindh',
    address_country: 'Pakistan',
  };

  constructor(private webApiService: WebApiService) {}

  ngOnInit(): void {}

  public createAddress() {
    this.webApiService.createAddress(this.mockAddress).subscribe((data) => {
      if (data) {
        alert('Address created successfully');
      }
    });
  }
}
