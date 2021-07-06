import { DeleteResult } from 'typeorm';

interface BaseInterfaceRepository<E> {
  /**
   * Creates a data structure that represents an entity and insert it to the database. Its returns it after
   * successfully inserted it to the db.
   * @param data represents the element (data structure) we want to add to the database.
   * @returns a promise of the data.
   */
  create(data: E | any): Promise<E>;

  /**
   * Searches in the db a data structure that have an identifier equal to the provided id.
   * @param id represents an unique identifier for the data structure. It can be either a string or a number.
   * @returns a promise of the data.
   */
  findOneById(id: string | number): Promise<E>;

  /**
   * Searches a specific data structure that matches a specific condition.
   * @param filterCondition represents a specific criteria to match before retrieving a data structure.
   * @returns a promise of the data.
   */
  findByCondition(filterCondition: any): Promise<E>;

  /**
   * Finds all the data inserted in a specific table.
   * @returns a promise of the arry of this data.
   */
  findAll(): Promise<E[]>;

  /**
   * Retrieves and deletes a specific data by it identifier.
   * @param id represents an unique identifier for the data structure. It can be either a string or a number.
   * @returns a promise of a typeorm's DeleteResult type. See @type { DeleteResult } for definition.
   */
  remove(id: string | number): Promise<DeleteResult>;

  /**
   * Retrieves and deletes a specific data that matches a condition.
   * @param filterCondition represents a specific criteria to match before retrieving a data structure.
   * @returns a promise of a typeorm's DeleteResult type. See @type { DeleteResult } for definition.
   */
  removeByCondition(filterCondition: any): Promise<DeleteResult>;

  /**
   * Searches specifics data belonging to a relationship with certains criteria.
   * @param relations represents a specific relationship between entities.
   * @returns a promise of the array of the data.
   */
  findWithRelations(relations: any): Promise<E[]>;
}

export { BaseInterfaceRepository as DatabaseHandleable };
