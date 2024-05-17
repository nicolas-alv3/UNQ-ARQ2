export interface ExternalUserRepository {
  getUserById(id: string): Promise<UserData>;
}

export interface UserData {
  name: string;
  email: string;
}
