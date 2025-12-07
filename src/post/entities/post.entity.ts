import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column('jsonb', { nullable: true })
  images: string[]; 
  @ManyToOne(() => User, user => user.posts)
  author: User;

  @Column()
  authorId: number;

  @CreateDateColumn()
  createdAt: Date;
}
