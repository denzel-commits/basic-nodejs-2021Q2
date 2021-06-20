import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column("varchar", {length: 36, nullable: true})
  public userId: string;

  @Column("varchar", {length: 36})
  public boardId: string;

  @Column("varchar", {length: 36, nullable: true})
  public columnId: string;
}
 
export { Task };