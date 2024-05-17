export class UserRestResponseDto {
  id: string;
  name: string;
  email: string;
  lastname: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.lastname = '';
  }
}
