import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task as TaskEntity } from './Task';

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
 
  @Column("varchar", {length: 50})
  public name: string;
 
  @Column("varchar", {length: 50})
  public login: string;
 
  @Column("varchar", {length: 50})
  public password: string;

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.user)
  public tasks: TaskEntity[];

}
 
export { User };