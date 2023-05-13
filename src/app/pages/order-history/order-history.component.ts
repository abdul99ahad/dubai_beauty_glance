import { Component, OnInit } from '@angular/core';
import { OrderDetailsHistory } from 'src/app/interfaces/order-details.interface';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  public orderDetails: Array<OrderDetailsHistory>;
  constructor(private webApiService: WebApiService) {}

  ngOnInit(): void {
    this.webApiService.getOrderHistory().subscribe((response) => {
      this.orderDetails = response.data;
      console.log(this.orderDetails);
    });
  }
}
