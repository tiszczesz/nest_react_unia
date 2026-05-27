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