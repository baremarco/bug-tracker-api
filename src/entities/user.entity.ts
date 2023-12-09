import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bug } from './bug.entity';
import { IsAlpha, MaxLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100
  })
  @IsAlpha()
  @MaxLength(100, {
    message:
      'Name is too long. Maximal length is $constraint1 characters, but actual is $value'
  })
  name!: string;

  @Column({ length: 100 })
  @IsAlpha()
  @MaxLength(100, {
    message:
      'Surname is too long. Maximal length is $constraint1 characters, but actual is $value'
  })
  surname!: string;

  @OneToMany(() => Bug, (bug) => bug.user)
  bugs!: Bug[];
}
