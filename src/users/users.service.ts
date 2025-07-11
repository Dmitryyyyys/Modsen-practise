import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import * as bcrypt from 'bcrypt'; 
@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
){}
async findAll(): Promise<User[]>{
    return this.userRepository.find();
}
async findById(id:string):Promise<User | null>{
    return this.userRepository.findOne({where:{id}});
}
async create(data:Partial<User>): Promise<User>{
if (!data.password){
    throw new Error('Password is required');
}
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password,salt);

    const user = this.userRepository.create({
        ...data,
        password:hashedPassword,});
    return this.userRepository.save(user);

}
async remove(id: string): Promise<void>{
    await this.userRepository.delete(id);
}
async findByUsername(username: string): Promise<User | null>{
    return this.userRepository.findOne({where: { username } });
}
}
