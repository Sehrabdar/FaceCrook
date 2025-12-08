import {
  Controller, Post, Body, Get, Param, UseGuards, UseInterceptors, UploadedFiles, Delete, SetMetadata, Patch
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard'
import { GetCurrentUser } from '../auth/getCurrentUser.decorator';
import { PoliciesGuard } from 'src/policies/policies.guard';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 4))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
    @GetCurrentUser() user: any,
  ) {
    const imagePaths = files?.map(file => `/uploads/posts/${file.filename}`) || [];
    const postData = {
      ...createPostDto,
      images: imagePaths,
      authorId: user.id,
    };
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
    return this.postService.findOne(id);
  }

  @Delete(':postId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @SetMetadata('roles', ['owner'])
  async remove(@Param('postId') postId: string, @GetCurrentUser() user: any) {
    return this.postService.remove(postId, user.id);
  }

  @Patch(':postId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @SetMetadata('roles', ['owner'])
  async update(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetCurrentUser() user: any
  ) {
    return this.postService.update(postId, updatePostDto, user.id);
  }
}
