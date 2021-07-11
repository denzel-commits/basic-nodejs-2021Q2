import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IsAuthGuard } from '../auth/guards/is.auth.guard';

@Controller('/boards/:boardId/tasks')
@UseGuards(IsAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  async findAll(@Param('boardId') boardId: string) {
    const tasks = await this.tasksService.findAll(boardId);
    if (tasks.length === 0) {
      throw new NotFoundException();
    }
    return tasks;
  }

  @Get(':id')
  async findOne(@Param('boardId') boardId: string, @Param('id') id: string) {
    const task = await this.tasksService.findOne(boardId, id);
    if (task === null) {
      throw new NotFoundException();
    }
    return task;
  }

  @Put(':id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.update(boardId, id, updateTaskDto);
    if (task === null) {
      throw new NotFoundException();
    }
    return task;
  }

  @Delete(':id')
  async remove(@Param('boardId') boardId: string, @Param('id') id: string) {
    const task = await this.tasksService.remove(boardId, id);
    if (task === null) {
      throw new NotFoundException();
    }
    return task;
  }
}
