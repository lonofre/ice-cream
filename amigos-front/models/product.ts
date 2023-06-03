export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface OrderProduct {
  product: Product;
  items: number;
}