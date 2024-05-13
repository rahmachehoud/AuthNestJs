import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
      }
    

      async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
      }
    
      async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ username }).exec();
        if (!user) {
          throw new NotFoundException(`User with username ${username} not found`);
        }
        return user;
      }
      async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!updatedUser) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return updatedUser;
      }
    
    
      async remove(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      }
}
