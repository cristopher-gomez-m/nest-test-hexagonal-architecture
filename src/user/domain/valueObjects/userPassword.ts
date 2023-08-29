//import * as bcrypt from 'bcrypt';
import { hash,compareSync } from 'bcrypt';
export class userPassword{
    private password: string;

    constructor(value:string){
       this.password =value;
    }

/*
    async validatePassword(password: string): Promise<boolean> {
        return await compareSync(password, this.password);
      }
*/
      async create(plainPassword: string): Promise<userPassword> {
        const hashedPassword = await this.hashPassword(plainPassword);
        return new userPassword(hashedPassword);
    }

     async hashPassword(plainPassword:string){
        return await hash(plainPassword,10);
    }

    getHashedPassword(): string {
        return this.password;
    }


}