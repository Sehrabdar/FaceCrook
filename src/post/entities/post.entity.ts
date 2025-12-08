import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

import { User } from '../../user/entities/user.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column('jsonb', { nullable: true })
  images: string[]; 
  @ManyToOne(() => User, user => user.posts)
  author: User;

  @Column()
  authorId: string;

  @CreateDateColumn()
  createdAt: Date;
}
