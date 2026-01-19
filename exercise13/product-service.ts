import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsImage=[
    {"ProductId":"p1","ProductName":"Coca","Price":100,"Image":"assets/images/learndirective/cocacola.JPG"},
    {"ProductId":"p2","ProductName":"Pepsi","Price":300,"Image":"assets/images/learndirective/pepsi.JPG"},
    {"ProductId":"p3","ProductName":"Sting","Price":200,"Image":"assets/images/learndirective/sting.JPG"},
  ]
  constructor() { }
  getProductsWithImages()
  {
    return this.productsImage
  }
  getProductDetail(id:any){
    return this.productsImage.find(x=>x.ProductId==id)
  }
}
