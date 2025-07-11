import { Controller, Get, Post as HttpPost, Put, Delete, Param, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

@Get()
findAll(){
    return this.postService.findAll();
}
@Get(':id')
findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
}
@HttpPost()
create(@Body() data: Partial<PostEntity>){
    return this.postService.create(data);
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
