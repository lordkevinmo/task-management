import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private repository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.repository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with "${id}" is not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.repository.createTask(createTaskDto, user);
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { id, status } = updateTaskDto;

    const task = await this.getTaskById(id);

    task.status = status;

    await this.repository.save(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with "${id}" is not found`);
    }
  }
}
