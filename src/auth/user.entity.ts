import { Exclude } from 'class-transformer';
import { MaxLength, MinLength } from 'class-validator';
import { Task } from '../tasks/tasks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @Column()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  @Exclude({ toPlainOnly: true })
  tasks: Task[];
}
