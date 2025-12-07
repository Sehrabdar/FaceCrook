import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto, authorId: number): Promise<Post> {
    const post = this.postRepository.create({
      ...createPostDto,
      authorId,
    });
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOneOrFail({ 
      where: { id }, 
      relations: ['author'] 
    });
  }
}
