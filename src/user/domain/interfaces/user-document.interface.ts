import { Address } from './address';

export interface UserDocumentInterface {
  _id: string;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  address: Address[];
}
