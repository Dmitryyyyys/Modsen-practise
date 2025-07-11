import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../users/user.entity';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    text:string;

    @CreateDateColumn({ name:'created_at'})
    createdAt: Date;
    @Column({ name: 'postId' })   
    postId: string;
    @ManyToOne(() => Post, (post) => post.comments, {onDelete:'CASCADE'})
    @JoinColumn({name:'postId'})
    post:Post;
    @Column({ name: 'authorId' })  
    authorId: string;
@ManyToOne(() => User, (user) => user.comments,{onDelete:'CASCADE'})
@JoinColumn({name:'authorId'})
author:User;
}