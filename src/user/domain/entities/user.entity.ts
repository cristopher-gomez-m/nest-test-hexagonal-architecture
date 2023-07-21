import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserId } from './userId';
@Entity()
export class User {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;

  constructor(id: UserId) {
    this.id = id?.toString(); // Convierte el UserId a string para almacenar en MySQL
  }
}
