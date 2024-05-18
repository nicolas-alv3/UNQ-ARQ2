export interface ExternalUserRepository {
  getUserById(id: string): Promise<UserData>;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}
