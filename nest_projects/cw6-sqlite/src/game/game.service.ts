import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Game } from 'src/Models/gameModel';
import type { IGameRepo } from 'src/Models/IGameRepo';

@Injectable()
export class GameService {
  constructor(@Inject('IGameRepo') private readonly repo: IGameRepo) {}

  getAll(): Game[] {
    return this.repo.getAll();
  }

  getById(id: number): Game {
    const game = this.repo.getById(id);
    if (!game) {
      throw new NotFoundException(`Game with id=${id} not found`);
    }
    return game;
  }

  create(game: Game): Game {
    return this.repo.add(game);
  }
}
