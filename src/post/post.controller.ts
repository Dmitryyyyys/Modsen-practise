import { Controller, Get, Post, Put, Delete, Param, Body,Request,UseGuards,Query } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

@Get()
findAll(){
    return this.postService.findAll();
}
@Get('search')
search(@Query('q') query: string){
    return this.postService.searchPosts(query);
}
@Get('filter')
filterByDate(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
) {
    return this.postService.sortPostsByDate(sort);
}
@Get(':id')
findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
}
 @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() data: Partial<PostEntity>) {
    return this.postService.create({
      ...data,
      authorId: req.user.userId, 
    });
}
@Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<PostEntity>){
        return this.postService.update(id,data);
    }
@Delete(':id')
remove(@Param('id') id: string){
    return this.postService.remove(id);
}

}

