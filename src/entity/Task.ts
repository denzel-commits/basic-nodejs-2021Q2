import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Task {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
 
  @Column("varchar", {length: 50})
  public title: string;
 
  @Column("smallint")
  public order: number;
 
  @Column("varchar", {length: 100})
  public description: string;

  @Column("varchar", {length: 100, nullable: true})
  public userId: string;

  @Column("varchar", {length: 100})
  public boardId: string;

  @Column("varchar", {length: 100, nullable: true})
  public string: string;
}
 
export { Task };