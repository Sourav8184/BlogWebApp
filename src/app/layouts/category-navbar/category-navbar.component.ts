import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/categories.interface';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.scss'],
})
export class CategoryNavbarComponent implements OnInit {
  categories: Category[] = [];

  constructor(private readonly categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
