import { IOrderItems } from "./order-items.model";
import { OrderStatus } from "./order-status.model";
import { PaymentStatus } from "./payment-status.model";

export interface IOrder{
  orderId: string,
  orderItems: IOrderItems[],
  orderStatus: OrderStatus,
  paymentStatus: PaymentStatus,
  subTotal: number,
  total: number,
  deliveryAddress: IAddress,
  deliveryCharges: number,
  orderDate: Date
}

export interface IOrderCreate{
  cartId: string,
  deliveryMethodId: string;
  deliveryAddress: IAddress
}

export interface IAddress{
  street: string,
  city: string,
  state: string,
  zipCode: string
}
