export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}
