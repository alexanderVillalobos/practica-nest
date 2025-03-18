import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  zipCode: string;
}

@Schema({
  timestamps: false,
  versionKey: false,
})
export class UserDocument extends Document {
  @Prop({
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  })
  email: string;

  @Prop({
    type: Number,
    min: [0, 'Age cannot be less than 0'],
    max: [120, 'Age cannot be greater than 120'],
  })
  age?: number;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop([Address])
  address: Address[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
