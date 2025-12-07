import { 
  Controller, Post, Body, Get, Param, UseGuards, Req,
  UseInterceptors, UploadedFiles
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { GetCurrentUser } from 'src/auth/getCurrentUser.decorator';
import { User } from '../user/entities/user.entity';
import type { Express } from 'express';
import { log } from 'console';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
@UseGuards(JwtAuthGuard)
@UseInterceptors(FilesInterceptor('images', 4)) 
async create(
  @Body() createPostDto: CreatePostDto,
  @UploadedFiles() files: Express.Multer.File[],
  @GetCurrentUser() user: any,
) {
  console.log('🔍 USER (fixed):', user);
  
  const imagePaths = files?.map(file => `/uploads/posts/${file.filename}`) || [];
  const postData = {
    ...createPostDto,
    images: imagePaths,
    authorId: user.id,
  };
  
  console.log('📤 postData:', postData);
  
  return this.postService.create(postData, user.id);
}



  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }
}
