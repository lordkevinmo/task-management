import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { Task } from '../entity/tasks.entity';
import { User } from '../../auth/user.entity';

export interface BaseTaskService {
  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
  getTaskById(id: string, user: User): Promise<Task>;
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
  updateTask(updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
  deleteTask(id: string, user: User): Promise<void>;
}
