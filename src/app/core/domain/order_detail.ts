import { Product } from './product';
import { Entity } from './_types/entity';

export class OrderDetail extends Entity {
  OrderID: number;
  Order: any; // => class Order;
  ProductID: number;
  Product: Product;
  UnitPrice: number;
  Quantity: number;
  Discount: number;
}
