import { dataSource } from '@src/common/typeorm.config';
import { injectable } from 'inversify';
import { EntityTarget, FindManyOptions, FindOneOptions, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@injectable()
export class BaseRepository<T extends ObjectLiteral> {
  private entityTarget: EntityTarget<T>;

  constructor(entityTarget: EntityTarget<T>) {
    this.entityTarget = entityTarget;
  }

  public async create(payload: DeepPartial<T>) {
    const entity = dataSource.manager.create<T>(this.entityTarget, payload);
    return dataSource.manager.save<T>(entity);
  }

  public async createQueryBuilder(alias: string) {
    return dataSource.manager.createQueryBuilder<T>(this.entityTarget, alias);
  }

  public async find(options: FindManyOptions<T>, relations?: string[], skip?: number, take?: number) {
    return dataSource.manager.find<T>(this.entityTarget, {
      ...options,
      relations,
      skip,
      take,
    });
  }

  public async findOne(options: FindOneOptions<T>, relations?: string[]) {
    return dataSource.manager.findOne<T>(this.entityTarget, {
      ...options,
      relations,
    } as FindOneOptions);
  }

  public async findById(id: string | number, relations?: string[]) {
    return dataSource.manager.findOne<T>(this.entityTarget, {
      where: { id },
      relations,
    } as FindOneOptions);
  }

  public async update(conditions: any, payload: QueryDeepPartialEntity<T>) {
    return dataSource.manager.update<T>(this.entityTarget, conditions, payload);
  }

  public async delete(conditions: any) {
    return dataSource.manager.delete<T>(this.entityTarget, conditions);
  }

  public async deleteById(id: string | number) {
    return dataSource.manager.delete<T>(this.entityTarget, id);
  }

  public async getEntityRepository() {
    return dataSource.getRepository<T>(this.entityTarget);
  }
}
