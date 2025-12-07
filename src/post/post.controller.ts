import {
  Controller, Post, Body, Get, Param, UseGuards, Req,
  UseInterceptors, UploadedFiles
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { GetCurrentUser } from 'src/auth/getCurrentUser.decorator';

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
    return this.postService.findOne(+id);
  }
}
