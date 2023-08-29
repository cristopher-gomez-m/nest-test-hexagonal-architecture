import { Column, Entity, PrimaryColumn, ValueTransformer } from 'typeorm';
import { UserId } from './userId';
import { userPassword } from '../valueObjects/userPassword';
import { passwordTransformer } from '../transformers/passwordTransformer';
import { compareSync } from 'bcrypt';
@Entity()
export class User {
  @PrimaryColumn()
  id: string;
  @Column({ length: 50 })
  email: string;

  @Column({ length: 100,type:'varchar' })
  password: string;

  constructor(id: UserId) {
    this.id = id?.toString(); // Convierte el UserId a string para almacenar en MySQL
  }

  async validatePassword(password: string): Promise<boolean> {
    return compareSync(password, this.password);
  }
}
