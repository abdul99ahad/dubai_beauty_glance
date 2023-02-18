import { Component, OnInit } from '@angular/core';
import { CategoryWithChildren } from "../../../../interfaces/categories.interface";
import { WebApiService } from 'src/app/services/web-api.service';
import { Output, EventEmitter } from '@angular/core';
import { map } from "rxjs";

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent implements OnInit {
  @Output() public onCategorySelected = new EventEmitter<string>();

  public categories: Array<CategoryWithChildren> = [];

  public constructor(private readonly webApiService: WebApiService) {}

  public ngOnInit(): void {
    this.webApiService.getCategories().pipe(
      map(({ data }: { data: Array<CategoryWithChildren> }) => data)
    ).subscribe((category: Array<CategoryWithChildren>) => {
      this.categories = category;
    });
  }

  public categoryClick(): void {
    this.onCategorySelected.emit();
  }
}
