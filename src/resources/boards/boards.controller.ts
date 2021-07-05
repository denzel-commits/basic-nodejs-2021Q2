import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { HttpExceptionFilter } from '../../exceptions/http-exception.filter';

@Controller('boards')
@UseFilters(HttpExceptionFilter)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.boardsService.findOne(id);
    if (board === null) {
      throw new NotFoundException();
    }
    return board;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const board = await this.boardsService.update(id, updateBoardDto);
    if (board === null) {
      throw new NotFoundException();
    }
    return board;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const board = await this.boardsService.remove(id);
    if (board === null) {
      throw new NotFoundException();
    }
    return board;
  }
}
