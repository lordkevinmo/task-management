import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTastDto } from './dtos/create-task-dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param() params): Task {
    return this.tasksService.getTaskById(params.id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTastDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param() params): void {
    this.tasksService.deleteTask(params.id);
  }
}
