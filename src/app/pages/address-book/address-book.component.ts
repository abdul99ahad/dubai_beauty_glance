import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressBook } from 'src/app/interfaces/address-book.interface';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],
})
export class AddressBookComponent implements OnInit {
  public countries: Array<string> = ['Pakistan'];
  public states: Array<string> = [
    'Sindh',
    'Punjab',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Gilgit-Baltistan',
    'Azad Jammu and Kashmir',
  ];
  public addressBook: AddressBook = {
    first_name: '',
    last_name: '',
    address_line_one: '',
    address_line_two: '',
    address_city: '',
    address_state: 'Sindh',
    address_country: 'Pakistan',
    address_zip_code: '',
    is_default: false,
  };

  constructor(private webApiService: WebApiService, private router: Router) {}

  ngOnInit(): void {}

  public createAddress() {
    this.webApiService.createAddress(this.addressBook).subscribe((data) => {
      if (data) {
        this.router.navigate(['/profile/address'], {
          state: { status: 'Success' },
        });
      }
    });
  }
}
