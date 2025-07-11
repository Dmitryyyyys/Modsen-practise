import { Injectable } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {User} from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    async ValidateUser(pass:string , username:string): Promise<any>{
        const user = await this.usersService.findByUsername(username);
        if(user && await bcrypt.compare(pass,user.password)){
            const {password, ...result } = user;
            return result;
        }
        return null;
    }
async login(user: any){
    const payload = { username: user.username, sub: user.id};
    return {
        acess_token: this.jwtService.sign(payload),
    };
}
}
