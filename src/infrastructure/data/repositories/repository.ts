export interface IRepositoryBase<TEntity> {
  save: (obj: TEntity) => Promise<void>
  load: () => Promise<TEntity[]>
  delete: (id: string | number) => Promise<void>
  exists: (id: string | number) => Promise<boolean>
}
