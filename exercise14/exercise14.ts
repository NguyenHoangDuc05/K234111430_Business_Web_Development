import { Component } from '@angular/core';
import { Catalogservice } from './catalogservice';
@Component({
  selector: 'app-exercise14',
  standalone: false,
  templateUrl: './exercise14.html',
  styleUrl: './exercise14.css',
})
export class Exercise14 {
  categories: any;

  constructor(private catalogService: Catalogservice) {
    this.categories = this.catalogService.getCategories();
  }
}