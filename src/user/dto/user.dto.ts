export class UserDto {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
}

export class UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
}
