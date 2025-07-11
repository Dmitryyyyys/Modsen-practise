import { Controller,Get,Post,Body,Param,Delete } from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from './user.entity';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
return this.usersService.findAll();
    }
@Get(':id')
async findById(@Param('id') id:string): Promise<User | null>{
    return this.usersService.findById(id);
}
@Post()
async create(@Body() data: Partial<User>): Promise<User>{
    return this.usersService.create(data);
}
@Delete(':id')
async remove(@Param('id') id: string): Promise<void>{
    return this.usersService.remove(id);
}
}
