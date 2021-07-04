import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task as TaskEntity } from './task.entity';
import { iColumn } from '../interfaces/column.interface';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', { length: 50 })
  public title: string;

  @Column({ type: 'json', array: false })
  columns: iColumn[];

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.board)
  public tasks: TaskEntity[];
}
