export interface ExternalSellerRepository {
  existSellerById(id: string): Promise<boolean>;
}
