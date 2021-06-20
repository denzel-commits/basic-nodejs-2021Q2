import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class BoardColumn {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
 
  @Column("varchar", {length: 50})
  public title: string;
 
  @Column("smallint")
  public order: number;

}
 
export { BoardColumn };