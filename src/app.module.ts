import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
type:'postgres',
host:'192.168.1.141',
port:5432,
username:'postgres',
password:'postgres',
database:'mydb',
synchronize:true,
autoLoadEntities:true,
    }),
    UsersModule,
    PostModule,
    CommentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
