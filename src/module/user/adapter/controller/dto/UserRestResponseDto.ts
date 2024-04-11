export class UserRestResponseDto {
  name: string;
  email: string;
  lastname: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.lastname = '';
  }
}
