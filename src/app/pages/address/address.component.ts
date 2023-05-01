import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddressBook } from 'src/app/interfaces/address-book.interface';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [MessageService],
})
export class AddressComponent implements OnInit {
  public addresses: Array<AddressBook>;
  public newAddressAdded: boolean = false;
  public successMessage: string = 'Address added successfully';
  constructor(
    private webApiService: WebApiService,
    private messageService: MessageService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.newAddressAdded = true;
    }
  }

  ngOnInit(): void {
    this.webApiService.getAddressses().subscribe((address) => {
      if (this.newAddressAdded) this.showSuccessMessage();
      this.addresses = address.data;
    });
  }

  showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Address added successfully',
    });

    setTimeout(() => {
      this.messageService.clear();
      this.newAddressAdded = false;
    }, 3000);
  }
}
