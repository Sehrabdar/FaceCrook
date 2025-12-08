import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { GetCurrentUser } from '../auth/getCurrentUser.decorator';
import { User } from './entities/user.entity';
import { PoliciesGuard } from 'src/policies/policies.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatarFile?: Express.Multer.File,
  ) {
    if (avatarFile) {
      createUserDto.avatar = `/uploads/avatars/${avatarFile.filename}`;
    }
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @GetCurrentUser() user: User,
  ) {
    const avatarPath = `/uploads/avatars/${file.filename}`;
    await this.userService.update(user.id, { avatar: avatarPath });
    return { avatar: avatarPath, message: 'Avatar updated successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @SetMetadata('roles', ['owner'])
  async remove(@Param('id') id: string, @GetCurrentUser() user: any) {
    return this.userService.remove(id, user.id);
  }
}
