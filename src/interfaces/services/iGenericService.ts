export interface iGenericService<Entity> {
  getAll(service: string): Promise<Entity[]>;
  getById(service: string): Promise<Entity>;
  add(service: string, model: Entity): Promise<any>;
  update(service: string, model: Entity): Promise<Entity>;
  delete(service: string, model: Entity): Promise<any>;
}
