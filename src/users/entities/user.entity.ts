import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;

  @Transform(({ value }) => (value as Date).getTime())
  createdAt: Date;

  @Transform(({ value }) => (value as Date).getTime())
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
