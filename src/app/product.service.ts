import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:9090/products';
  constructor(public http: HttpClient) {}

  loadAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/findAllProducts', {
      responseType: 'json',
    });
  }

  storeProduct(product: Product): Observable<string> {
    return this.http.post(this.baseUrl + '/storeProduct', product, {
      responseType: 'text',
    });
  }
}
