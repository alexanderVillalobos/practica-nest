import { Address } from '../interfaces/address';

export class User {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  address: Address[];
  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.age = user.age;
    this.createdAt = user.createdAt;
    this.address = user.address;
  }
}
