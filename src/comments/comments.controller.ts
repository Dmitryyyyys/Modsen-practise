import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService){}
@Post()
create(@Body() data: Partial<Comment>){
    return this.commentsService.create(data);
}
@Get()
findAll(){
    return this.commentsService.findAll();
}
@Get(':id')
findOne(@Param('id') id: string){
    return this.commentsService.findById(id);
}
@Delete(':id')
remove(@Param('id') id: string){
    return this.commentsService.remove(id);
}
}
