import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard = this.boardsRepository.create(createBoardDto);

    return await this.boardsRepository.save(createdBoard);
  }

  async findAll(): Promise<Board[]> {
    return await this.boardsRepository.find();
  }

  async findOne(id: string): Promise<Board | null> {
    const board = await this.boardsRepository.findOne(id);

    return board ?? null;
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board | null> {
    const board = await this.boardsRepository.findOne(id);

    if (!board) return null;

    return await this.boardsRepository.save({ ...updateBoardDto, id });
  }

  async remove(id: string): Promise<Board | null> {
    const board = await this.boardsRepository.findOne(id);

    if (!board) return null;

    await this.boardsRepository.delete(id);

    return board;
  }
}
