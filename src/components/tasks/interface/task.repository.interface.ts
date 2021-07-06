import { User } from '@components/auth/user.entity';
import { DatabaseHandleable } from '@repositories/base/base.interface.repository';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { Task } from '../entity/tasks.entity';

interface TaskRepository extends DatabaseHandleable<Task> {
  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
  getTaskById(id: string, user: User): Promise<Task>;
  updateTask(task: Task): Promise<Task>;
  deleteTask(id: string, user: User): Promise<number>;
}

export { TaskRepository as BaseTaskRepository };
