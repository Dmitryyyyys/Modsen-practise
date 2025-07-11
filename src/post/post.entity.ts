import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from 'src/comments/comment.entity';
@Entity('posts')
export class Post{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({length:255})
    title:string;

    @Column('text')
    description:string;
    @Column()
    authorId:string;

    @ManyToOne(() => User,{eager:false})
    @JoinColumn({name:'authorId'})
    author:User;
    @OneToMany(() => Comment, (comment) => comment.post)
    comments:Comment[];
    @CreateDateColumn({name:'created_at'})
createdAt:Date;
@UpdateDateColumn({name:'updated_at'})
updateAt:Date;
}