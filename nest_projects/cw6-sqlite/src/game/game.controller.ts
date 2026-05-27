import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GameService } from './game.service';
import type { Game } from 'src/Models/gameModel';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  getAll(): Game[] {
    return this.gameService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Game {
    return this.gameService.getById(id);
  }

  @Post()
  create(@Body() body: Game): Game {
    return this.gameService.create(body);
  }
}
