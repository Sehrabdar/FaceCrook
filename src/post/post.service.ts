import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';

import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createPostDto: CreatePostDto, authorId: string): Promise<Post> {
    const post = this.postRepository.create({
      ...createPostDto,
      authorId,
    });
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['author']
    });
  }

  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOneOrFail({
      where: {
        id,
        deletedAt: IsNull()
      },
      relations: ['author']
    });
  }

  async remove(postId: string, userId: string): Promise<void> {
    console.log('🛡️ POST DELETE:', { postId, userId });
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
        author: { id: userId },
        deletedAt: IsNull()
      }
    });
    console.log('🛡️ POST FOUND:', post?.id, 'Author:', post?.author?.id);

    if (!post) {
      throw new NotFoundException('Post not found or access denied');
    }

    await this.postRepository.softDelete(postId);
    console.log('🛡️ POST DELETED');
  }

  async update(postId: string, updatePostDto: UpdatePostDto, userId: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { 
        id: postId, 
        author: { id: userId }, 
        deletedAt: IsNull() 
      }
    });

    if (!post) {
      throw new NotFoundException('Post not found or access denied');
    }

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }
}
