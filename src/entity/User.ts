import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
 
export { User };