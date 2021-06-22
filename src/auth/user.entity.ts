import { MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
