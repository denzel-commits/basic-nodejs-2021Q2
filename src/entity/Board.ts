import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Board {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
 
  @Column("varchar", {length: 50})
  public title: string;

}
 
export { Board };