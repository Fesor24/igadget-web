import { IShoppingCartItem } from "./cart-item.model";
import {v4 as uuidv4} from 'uuid';

export interface IShoppingCart{
  id: string;
  items: IShoppingCartItem[];
}

export class ShoppingCart implements IShoppingCart{
  id: string = uuidv4();
  items: IShoppingCartItem[] = [];
}
