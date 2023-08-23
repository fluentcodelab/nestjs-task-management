import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(private repository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.repository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.repository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  createTask(dto: CreateTaskDto): Promise<Task> {
    return this.repository.createTask(dto);
  }

  async deleteTask(id: string): Promise<void> {
    const { affected } = await this.repository.delete(id);
    if (affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.repository.save(task);
    return task;
  }
}
