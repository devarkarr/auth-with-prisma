import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 220,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 220,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Exclude()
  password?: string;

  @Column({
    type: 'varchar',
    length: 220,
    nullable: true,
  })
  googleId?: string;
}
