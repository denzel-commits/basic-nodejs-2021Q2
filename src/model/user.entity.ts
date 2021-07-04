import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task as TaskEntity } from './task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', { length: 100, nullable: false })
  public name: string;

  @Column('varchar', { length: 100, nullable: false })
  public login: string;

  @Column('varchar', { length: 255, nullable: false })
  public password: string;

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.user)
  public tasks: TaskEntity[];
}
