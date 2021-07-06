import { User } from '@components/auth/user.entity';
import { isUndefined } from 'src/share/util/utils';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskStatus } from '../entity/task-status.enum';
import { Task } from '../entity/tasks.entity';

export class TaskFactory {
  buildTaskFromCreator(createTaskDto: CreateTaskDto, user: User): Task {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    return task;
  }

  buildTaskFromUpdator(task: Task, updateTaskDto: UpdateTaskDto): Task {
    if (!isUndefined(updateTaskDto.title)) {
      task.title = updateTaskDto.title;
    }

    if (!isUndefined(updateTaskDto.description)) {
      task.description = updateTaskDto.description;
    }

    if (!isUndefined(updateTaskDto.status)) {
      task.status = updateTaskDto.status;
    }

    return task;
  }
}
