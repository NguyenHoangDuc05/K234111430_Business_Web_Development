import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Catalogservice {
  datas=[
    {"Cateid":"cate1","CateName":"nuoc ngot",
      "Products":[
      {"ProductId":"p1", "ProductName":"Coca","Price":100, "Image":"assets/images/learndirective/cocacola.JPG"},
      {"ProductId":"p2","ProductName":"Pepsi","Price":300, "Image":"assets/images/learndirective/pepsi.JPG"},
      {"ProductId":"p3","ProductName":"Sting","Price":200, "Image":"assets/images/learndirective/sting.JPG"},
      ]
    },
    {"Cateid":"cate2","CateName":"Bia",
      "Products":[
      {"ProductId":"p4","ProductName":"heineken","Price":500, "Image":"assets/images/learndirective/heineken.jpg"},
      {"ProductId":"p5","ProductName":"333","Price":400, "Image":"assets/images/learndirective/333.jpg"},
      {"ProductId":"p6","ProductName":"Sai Gon","Price":600, "Image":"assets/images/learndirective/saigon.jpg"},
    ]
    },
  ]

  constructor() { }
  getCategories()
  {
    return this.datas
  }
}
