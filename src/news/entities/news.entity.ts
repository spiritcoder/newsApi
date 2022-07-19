import { Tag } from 'src/tag/entities/tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, nullable: false })
  name: string;

  @Column({ length: 25 })
  author: string;

  @Column()
  text: string;

  @Column('date')
  creationDate: Date;

  @Column('date')
  publicationDate: Date;

  @Column('date')
  expiryDate: Date;

  @Column()
  sentiment: string;

  @Column()
  tag: string;
}
