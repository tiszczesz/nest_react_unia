import { Game } from './gameModel';

export interface IGameRepo {
  getAll(): Game[];
  getById(id: number): Game | null;
  add(game: Game): Game;
}
