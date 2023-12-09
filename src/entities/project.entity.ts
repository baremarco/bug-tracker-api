import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsAlpha, IsAlphanumeric, MaxLength } from 'class-validator';

import { Bug } from './bug.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @IsAlpha()
  @MaxLength(100, {
    message:
      'Name is too long. Maximal length is $constraint1 characters, but actual is $value'
  })
  name!: string;

  @Column({ length: 100, nullable: true })
  @IsAlphanumeric()
  @MaxLength(100, {
    message:
      'Name is too long. Maximal length is $constraint1 characters, but actual is $value'
  })
  description!: string;

  @OneToMany(() => Bug, (bug) => bug.project)
  bugs!: Bug[];
}
