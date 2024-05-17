export interface ExternalUserRepository {
  existUserById(id: string): Promise<boolean>;
}
