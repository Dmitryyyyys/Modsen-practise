import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import {  NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
    ){}
async findAll(): Promise<Post[]>{
return this.postRepo.find({relations:['comments'],
select:['id','title','description','authorId','createdAt','updateAt'],
});
}
async findOne(id: string): Promise<Post | null>{
    return this.postRepo.findOne({where:{ id },relations:['comments'],select:['id','title','description','authorId','createdAt','updateAt']});
}
async create(data: Partial<Post>): Promise<Post>{
    const post = this.postRepo.create(data);
    return this.postRepo.save(post);
}
async update(id:string,data: Partial<Post>): Promise<Post>{
    await this.postRepo.update(id,data);
    const updated = await this.findOne(id);
    if(!updated){
   throw new NotFoundException(`Post with ID ${id} not found`);
    }
return updated;
}
async remove(id: string): Promise<void>{
    await this.postRepo.delete(id);
}
async searchPosts(query: string): Promise<Post[]>{
return this.postRepo.find({
    where: [
{title: ILike(`%${query}%`)},
{description: ILike(`%${query}%`)},
    ],
});
}
async sortPostsByDate(order: 'asc' | 'desc' = 'desc'): Promise<Post[]>{
    return this.postRepo.find({
        order: {
            createdAt: order.toUpperCase() as 'ASC' | 'DESC',
        },
    });
}
}
