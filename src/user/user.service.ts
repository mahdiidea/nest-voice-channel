import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email: email }).exec();
  }

  async create(user: User): Promise<User> {
    const model = new this.model(user);
    return model.save();
  }

  async readAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async readById(id): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async update(id, User: User): Promise<User> {
    return this.model.findByIdAndUpdate(id, User, { new: true });
  }

  async delete(id): Promise<any> {
    return this.model.findByIdAndRemove(id);
  }
}
