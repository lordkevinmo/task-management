import { DeleteResult, Repository } from 'typeorm';
import { DatabaseHandleable } from './base.interface.repository';

abstract class BaseAbstractRepository<E> implements DatabaseHandleable<E> {
  private entity: Repository<E>;

  protected constructor(entity: Repository<E>) {
    this.entity = entity;
  }

  async create(data: E | any): Promise<E> {
    return await this.entity.save(data);
  }

  async findOneById(id: string | number): Promise<E> {
    return await this.entity.findOne(id);
  }

  async findByCondition(filterCondition: any): Promise<E> {
    return await this.entity.findOne({ where: filterCondition });
  }

  async findAll(): Promise<E[]> {
    return await this.entity.find();
  }

  async remove(id: string | number): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }

  async findWithRelations(relations: any): Promise<E[]> {
    return await this.entity.find(relations);
  }
}

export { BaseAbstractRepository as BaseRepository };
