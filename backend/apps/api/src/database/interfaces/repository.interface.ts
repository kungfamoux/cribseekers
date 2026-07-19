export interface FindManyOptions<TWhere = unknown, TOrderBy = unknown> {
  readonly where?: TWhere;
  readonly orderBy?: TOrderBy;
  readonly skip?: number;
  readonly take?: number;
}

export interface Repository<TEntity, TId = string, TCreate = unknown, TUpdate = unknown> {
  findById(id: TId): Promise<TEntity | null>;
  findMany(options?: FindManyOptions): Promise<TEntity[]>;
  create(data: TCreate): Promise<TEntity>;
  update(id: TId, data: TUpdate): Promise<TEntity>;
  delete(id: TId): Promise<TEntity>;
}

export interface ReadRepository<TEntity, TId = string> {
  findById(id: TId): Promise<TEntity | null>;
  exists(id: TId): Promise<boolean>;
}

export interface TransactionalRepository<TTransactionClient> {
  withTransaction(transaction: TTransactionClient): this;
}

export interface OptimisticLockable {
  readonly id: string;
  readonly version: number;
}

export interface OptimisticUpdateInput {
  readonly id: string;
  readonly version: number;
}

