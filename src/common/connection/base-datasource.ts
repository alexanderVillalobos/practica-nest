import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class BaseDatasource<T> {
  constructor(@InjectModel('User') protected readonly model: Model<T>) {}
}
