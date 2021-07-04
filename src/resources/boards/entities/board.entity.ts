import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Column as ColumnModel } from '../resources/boards/column.model';
import { Task as TaskEntity } from './Task';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', { length: 50 })
  public title: string;

  @Column({ type: 'json', array: false })
  columns: ColumnModel[];

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.board)
  public tasks: TaskEntity[];
}
