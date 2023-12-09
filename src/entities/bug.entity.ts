import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';
import { MaxLength } from 'class-validator';

import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class Bug {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @MaxLength(100, {
    message:
      'Description is too long. Maximal length is $constraint1 characters, but actual is $value'
  })
  description!: string;

  @CreateDateColumn()
  creationDate!: Date;

  @ManyToOne(() => User, (user) => user.bugs)
  user!: User;

  @ManyToOne(() => Project, (project) => project.bugs)
  project!: Project;
}
