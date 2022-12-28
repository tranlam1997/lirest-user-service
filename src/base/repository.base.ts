import { dataSource } from '@src/common/database-config';
import { EntityTarget, FindManyOptions, FindOneOptions } from 'typeorm';

export function BaseRepository<T>(entityTarget: EntityTarget<T>) {
  return {
    create(payload: any) {
      const entity = dataSource.manager.create<T>(entityTarget, payload);
      return dataSource.manager.save<T>(entity);
    },

    createQueryBuilder(alias: string) {
      return dataSource.manager.createQueryBuilder<T>(entityTarget, alias);
    },

    find(options: any, relations?: string[], skip?: number, take?: number) {
      return dataSource.manager.find<T>(entityTarget, {
        ...options,
        relations,
        skip,
        take,
      } as FindManyOptions);
    },

    findOne(options: any, relations?: string[]) {
      return dataSource.manager.findOne<T>(entityTarget, {
        ...options,
        relations,
      } as FindOneOptions);
    },

    findById(id: any, relations?: string[]) {
      return dataSource.manager.findOne<T>(entityTarget, {
        where: { id },
        relations,
      } as FindOneOptions);
    },

    update(conditions: any, payload: any) {
      return dataSource.manager.update<T>(entityTarget, conditions, payload);
    },

    delete(conditions: any) {
      return dataSource.manager.delete<T>(entityTarget, conditions);
    },

    deleteById(id: any) {
      return dataSource.manager.delete<T>(entityTarget, id);
    },

    getEntityRepository() {
      return dataSource.getRepository<T>(entityTarget);
    },
  };
}
