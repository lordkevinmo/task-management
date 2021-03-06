import { IsEnum } from 'class-validator';
import { TaskStatus } from '../entity/task-status.enum';

export class UpdateTaskDto {
  id?: string;
  title?: string;
  description?: string;
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
