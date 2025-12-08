import { Column, OneToMany, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Post } from "src/post/entities/post.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    avatar: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Post, post => post.author)  
  posts: Post[];
}
