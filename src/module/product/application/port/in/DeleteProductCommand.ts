export interface DeleteProductCommand {
  execute: (id: string) => Promise<boolean>;
}
