import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User as UserEntity } from './User'; 
import { Board as BoardEntity } from './Board'; 

@Entity()
class Task {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
 
  @Column("varchar", {length: 50})
  public title: string;
 
  @Column("smallint")
  public order: number;
 
  @Column("varchar", {length: 255})
  public description: string;

  @Column("varchar", {nullable: true})
  public userId: string | null;

  @Column("varchar", {nullable: true})
  public boardId: string;

  @Column("varchar", {nullable: true})
  public columnId: string | null;

  @ManyToOne( () => UserEntity, (user: UserEntity) => user.tasks, {onDelete: 'SET NULL'})
  public user : UserEntity;

  @ManyToOne( () => BoardEntity, (board: BoardEntity) => board.tasks, {onDelete: 'CASCADE'})
  public board : BoardEntity;
}
 
export { Task };