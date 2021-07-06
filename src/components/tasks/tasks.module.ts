import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from '@repositories/task.repository';
import { AuthModule } from '../auth/auth.module';
import { Task } from './entity/tasks.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [
    {
      provide: 'BaseTaskRepository',
      useClass: TaskRepository,
    },
    {
      provide: 'BaseTaskService',
      useClass: TasksService,
    },
  ],
})
export class TasksModule {}
