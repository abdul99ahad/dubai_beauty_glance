import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCartItem } from '../utilities/productCartItem';

@Injectable({
  providedIn: 'root',
})
export class WishListService<T> {
  wishList: Array<T> = [];
  private onChangeItemCount = new BehaviorSubject(this.itemCount());
  onChange = this.onChangeItemCount.asObservable();

  private addItemBehavior = new BehaviorSubject('');
  addItemBehaviorObservable = this.addItemBehavior.asObservable();
  constructor() {}

  addItem(item: T): void {
    this.wishList.push(item);
    this.onChangeItemCount.next(this.itemCount());
    localStorage.setItem('wishlist', JSON.stringify(this.wishList));
    this.addItemBehavior.next(JSON.stringify(item));
  }

  //   getItem(id: number) : ProductCartItem {
  //   }

  getItems(): Array<T> {
    this.wishList = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.onChangeItemCount.next(this.itemCount());
    return this.wishList;
  }

  itemCount(): number {
    return this.wishList.length;
  }

  deleteItem(item: T): void {
    const idxObj = this.wishList.findIndex((object) => {
      return object === item;
    });
    this.wishList.splice(idxObj, 1);
    // this.wishList = this.wishList.filter((obj) => obj != item);
    this.onChangeItemCount.next(this.itemCount());
    localStorage.setItem('wishlist', JSON.stringify(this.wishList));
  }
}
