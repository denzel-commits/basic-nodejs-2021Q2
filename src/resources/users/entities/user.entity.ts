import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task as TaskEntity } from '../../tasks/entities/task.entity';

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

  toResponse(): { id: string; name: string; login: string } {
    return { id: this.id, name: this.name, login: this.login };
  }
}
