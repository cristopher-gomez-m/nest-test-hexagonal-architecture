import { ValueTransformer } from "typeorm";
import { userPassword } from "../valueObjects/userPassword";

export class passwordTransformer implements ValueTransformer{
    to(password:userPassword):string{
        return password.getHashedPassword();
    }
    from(value:string):userPassword{
        return new userPassword(value);
    }
}