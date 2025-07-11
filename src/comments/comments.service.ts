import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepo: Repository<Comment>,
    ){}

create(data: Partial<Comment>){
    const comment = this.commentRepo.create(data);
    return this.commentRepo.save(comment);
}
findAll() {
    return this.commentRepo.find({relations: ['post','author']});
}
findById(id: string){
    return this.commentRepo.findOne({where: {id},relations: ['post','author']});
}
async remove(id: string){
    await this.commentRepo.delete(id);
}
}
