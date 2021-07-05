import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = this.tasksRepository.create({
      ...createTaskDto,
      boardId,
    });
    return await this.tasksRepository.save(createdTask);
  }

  async findAll(boardId: string): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { boardId } });
  }

  async findOne(boardId: string, id: string): Promise<Task | null> {
    const task = await this.tasksRepository.findOne({
      where: { boardId, id },
    });

    return task ?? null;
  }

  async update(boardId: string, id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne({ where: { boardId, id } });

    if (!task) return null;

    return await this.tasksRepository.save({ ...updateTaskDto, id, boardId });
  }

  async remove(boardId: string, id: string) {
    const task = await this.tasksRepository.findOne({ where: { boardId, id } });

    if (!task) return null;

    await this.tasksRepository.delete({ boardId, id });

    return task;
  }
}
