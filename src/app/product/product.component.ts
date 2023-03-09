import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productRef = new FormGroup({
    pid: new FormControl(),
    pname: new FormControl(),
    price: new FormControl(),
  });

  products: Array<Product> = [];
  constructor(public ps: ProductService) {}
  msg: string = '';
  ngOnInit() {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.ps.loadAllProducts().subscribe({
      next: (data: any) => (this.products = data),
      error: (error: any) => console.log(error),
      complete: () => console.log('data loaded successfully'),
    });
  }

  storeProduct() {
    let product = this.productRef.value;
    console.log(product);
    this.ps.storeProduct(product).subscribe({
      next: (data: any) => (this.msg = data),
      error: (error: any) => console.log(error),
      complete: () => {
        console.log('store product');
        this.loadAllProducts();
      },
    });
    this.productRef.reset();
  }
}
