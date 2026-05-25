# SQLite w NestJS (better-sqlite3) - krok po kroku

Ponizej masz pelna instrukcje dodania obslugi SQLite w projekcie `cw6-sqlite` z repozytorium `SqliteRepo.ts`.
Model danych: `game` z polami:

- `name`
- `createDate`
- `price`
- `category`

## 1. Instalacja pakietow

W katalogu `cw6-sqlite` uruchom:

```bash
npm install better-sqlite3
npm install -D @types/better-sqlite3
```

## 2. Struktura plikow

W `src` dodaj katalogi i pliki:

```text
src/
  models/
    gameModel.ts
    IGameRepo.ts
    SqliteRepo.ts
  game/
    game.controller.ts
    game.service.ts
    game.module.ts
```

## 3. Model danych

Plik: `src/models/gameModel.ts`

```ts
export interface Game {
  id?: number;
  name: string;
  createDate: string;
  price: number;
  category: string;
}
```

## 4. Kontrakt repozytorium

Plik: `src/models/IGameRepo.ts`

```ts
import { Game } from './gameModel';

export interface IGameRepo {
  getAll(): Game[];
  getById(id: number): Game | null;
  add(game: Game): Game;
}
```

## 5. Repozytorium SQLite

Plik: `src/models/SqliteRepo.ts`

```ts
import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { IGameRepo } from './IGameRepo';
import { Game } from './gameModel';

@Injectable()
export class SqliteRepo implements IGameRepo {
  private readonly db: Database.Database;

  constructor() {
    this.db = new Database('games.db');
    this.createTableIfNotExists();
    this.seedIfEmpty();
  }

  private createTableIfNotExists(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS game (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        createDate TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
      )
    `);
  }

  private seedIfEmpty(): void {
    const row = this.db.prepare('SELECT COUNT(*) as count FROM game').get() as {
      count: number;
    };

    if (row.count === 0) {
      const insert = this.db.prepare(
        'INSERT INTO game (name, createDate, price, category) VALUES (@name, @createDate, @price, @category)',
      );

      const seed: Game[] = [
        {
          name: 'Witcher 3',
          createDate: '2015-05-19',
          price: 129.99,
          category: 'RPG',
        },
        {
          name: 'Forza Horizon 5',
          createDate: '2021-11-09',
          price: 199.99,
          category: 'Racing',
        },
      ];

      const tx = this.db.transaction((items: Game[]) => {
        for (const item of items) {
          insert.run(item);
        }
      });

      tx(seed);
    }
  }

  getAll(): Game[] {
    return this.db
      .prepare('SELECT id, name, createDate, price, category FROM game')
      .all() as Game[];
  }

  getById(id: number): Game | null {
    const row = this.db
      .prepare(
        'SELECT id, name, createDate, price, category FROM game WHERE id = ?',
      )
      .get(id) as Game | undefined;

    return row ?? null;
  }

  add(game: Game): Game {
    const result = this.db
      .prepare(
        'INSERT INTO game (name, createDate, price, category) VALUES (?, ?, ?, ?)',
      )
      .run(game.name, game.createDate, game.price, game.category);

    return {
      id: Number(result.lastInsertRowid),
      ...game,
    };
  }
}
```

## 6. Serwis `game`

Plik: `src/game/game.service.ts`

```ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Game } from '../models/gameModel';
import { IGameRepo } from '../models/IGameRepo';

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
```

## 7. Kontroler `game`

Plik: `src/game/game.controller.ts`

```ts
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from '../models/gameModel';

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
```

## 8. Modul `game`

Plik: `src/game/game.module.ts`

```ts
import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { SqliteRepo } from '../models/SqliteRepo';

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
```

## 9. Podpiecie modulu w AppModule

Zmien `src/app.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';

@Module({
  imports: [GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 10. Uruchomienie

```bash
npm run start:dev
```

## 11. Test endpointow

### GET wszystkie gry

```bash
curl http://localhost:3000/games
```

### GET po id

```bash
curl http://localhost:3000/games/1
```

### POST nowa gra

```bash
curl -X POST http://localhost:3000/games \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hades",
    "createDate": "2020-09-17",
    "price": 89.99,
    "category": "Roguelike"
  }'
```

## 12. Co powstanie po starcie

Po pierwszym uruchomieniu repozytorium:

- utworzy plik `games.db` w katalogu projektu,
- utworzy tabele `game`,
- doda dane startowe, jesli tabela jest pusta.

To wszystko. Masz gotowa obsluge SQLite przez `better-sqlite3` z oddzielonym repozytorium `SqliteRepo.ts`.
