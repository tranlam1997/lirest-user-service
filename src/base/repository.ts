import { dataSource } from '@src/common/typeorm';
import { EntityTarget, FindManyOptions, FindOneOptions, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export function BaseRepository<T extends ObjectLiteral>(entityTarget: EntityTarget<T>) {
  return {
    async create(payload: DeepPartial<T>) {
      const entity = dataSource.manager.create<T>(entityTarget, payload);
      return dataSource.manager.save<T>(entity);
    },

    async createQueryBuilder(alias: string) {
      return dataSource.manager.createQueryBuilder<T>(entityTarget, alias);
    },

    async find(options: FindManyOptions<T>, relations?: string[], skip?: number, take?: number) {
      return dataSource.manager.find<T>(entityTarget, {
        ...options,
        relations,
        skip,
        take,
      });
    },

    async findOne(options: FindOneOptions<T>, relations?: string[]) {
      return dataSource.manager.findOne<T>(entityTarget, {
        ...options,
        relations,
      } as FindOneOptions);
    },

    async findById(id: string | number, relations?: string[]) {
      return dataSource.manager.findOne<T>(entityTarget, {
        where: { id },
        relations,
      } as FindOneOptions);
    },

    async update(conditions: any, payload: QueryDeepPartialEntity<T>) {
      return dataSource.manager.update<T>(entityTarget, conditions, payload);
    },

    async delete(conditions: any) {
      return dataSource.manager.delete<T>(entityTarget, conditions);
    },

    async deleteById(id: string | number) {
      return dataSource.manager.delete<T>(entityTarget, id);
    },

    async getEntityRepository() {
      return dataSource.getRepository<T>(entityTarget);
    },
  };
}
