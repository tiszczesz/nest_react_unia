import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { SqliteRepo } from 'src/Models/SqliteRepo';

@Module({
  controllers: [GameController],
  providers: [
    GameService,
    {
      provide: 'IGameRepo',
      useClass: SqliteRepo,
    },
  ],
})
export class GameModule {}
