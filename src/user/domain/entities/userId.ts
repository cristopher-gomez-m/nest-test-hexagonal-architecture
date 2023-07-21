import { v4 as uuidv4, validate as validateUuid } from 'uuid';
export class UserId {
  private readonly id: string;

  private constructor(id: string) {
    this.id = id;
  }

  static generate(): UserId {
    return new UserId(uuidv4());
  }

  static build(id: string): UserId {
    if (validateUuid(id)) {
      return new UserId(id);
    } else {
      throw new Error('Invalid UserId format: ' + id);
    }
  }

  toString(): string {
    return this.id;
  }
}
