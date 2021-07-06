import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/tasks.entity';
import { BaseTaskService } from './interface/task.service.interface';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(
    @Inject('BaseTaskService')
    private readonly tasksService: BaseTaskService,
  ) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get(':id')
  getTaskById(@Param() params, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(params.id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch(':id/status')
  updateTask(
    @Param() params,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    updateTaskDto.id = params.id;
    return this.tasksService.updateTask(updateTaskDto, user);
  }

  @Delete(':id')
  deleteTask(@Param() params, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(params.id, user);
  }
}
