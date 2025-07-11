import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Post } from '../post/post.entity'
import { Comment } from 'src/comments/comment.entity';
@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;
  @Column({unique:true,length:50})
  username:string;
  @Column({unique:true,length:100})
  email:string;
  @Column({length:100})
  password:string;
  @CreateDateColumn({name:'created_at'})
  createdAt:Date;
@UpdateDateColumn({name:'updated_at'})
updatedAt:Date;
@OneToMany(() => Post, post => post.author)
post:Post[];
@OneToMany(() => Comment,(comment) => comment.author)
comments:Comment[];
}