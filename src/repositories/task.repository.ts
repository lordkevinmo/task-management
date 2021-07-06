import { User } from '@components/auth/user.entity';
import { GetTasksFilterDto } from '@components/tasks/dto/get-tasks-filter.dto';
import { Task } from '@components/tasks/entity/tasks.entity';
import { BaseTaskRepository } from '@components/tasks/interface/task.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base/base.abstract.repository';

@Injectable()
export class TaskRepository
  extends BaseRepository<Task>
  implements BaseTaskRepository
{
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return await this.findByCondition({ id, user });
  }

  async updateTask(task: Task): Promise<Task> {
    return await this.create(task);
  }

  async deleteTask(id: string, user: User): Promise<number> {
    const result = await this.removeByCondition({ id, user });

    return await result.affected;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
