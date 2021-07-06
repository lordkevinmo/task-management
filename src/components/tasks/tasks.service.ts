import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './entity/tasks.entity';
import { User } from '../auth/user.entity';
import { BaseTaskRepository } from './interface/task.repository.interface';
import { BaseTaskService } from './interface/task.service.interface';
import { TaskFactory } from './factory/task.factory';

@Injectable()
export class TasksService implements BaseTaskService {
  constructor(
    @Inject('BaseTaskRepository')
    private readonly repository: BaseTaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.repository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = this.repository.getTaskById(id, user);

    if (!found) {
      throw new NotFoundException(`Task with "${id}" is not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = new TaskFactory().buildTaskFromCreator(createTaskDto, user);
    return this.repository.create(task);
  }

  async updateTask(updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const found = await this.getTaskById(updateTaskDto.id, user);

    const task = new TaskFactory().buildTaskFromUpdator(found, updateTaskDto);

    return this.repository.updateTask(task);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.repository.deleteTask(id, user);

    if (result === 0) {
      throw new NotFoundException(`Task with "${id}" is not found`);
    }
  }
}
