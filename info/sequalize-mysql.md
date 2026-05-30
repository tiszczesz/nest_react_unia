# NestJS + Sequelize (ORM) + MySQL — instrukcja i przykład

Ten dokument pokazuje, jak skonfigurować **Sequelize** w aplikacji **NestJS** z bazą **MySQL**:
- instalacja paczek
- konfiguracja połączenia (sequelize-typescript)
- przykładowy model encji
- przykładowy moduł/serwis/kontroler (CRUD)
- migracje (opcjonalnie) lub `synchronize` (tylko dev)

> Rekomendacja: w NestJS najwygodniej używać `@nestjs/sequelize` + `sequelize-typescript`.

---

## 1) Wymagania

- Node.js (LTS)
- MySQL 8.x (lub MariaDB)
- działający projekt NestJS (np. utworzony przez `nest new ...`)

---

## 2) Instalacja zależności

```bash
npm i @nestjs/sequelize sequelize sequelize-typescript mysql2
npm i -D @types/sequelize
```

Uwagi:
- `mysql2` to driver do MySQL.
- `sequelize-typescript` umożliwia dekoratory i klasy TS dla modeli.

---

## 3) Zmienne środowiskowe (.env)

Dodaj `.env` (lub uzupełnij istniejący):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=secret
DB_NAME=nestjs_my
DB_LOGGING=false
DB_SYNC=true
```

> `DB_SYNC=true` jest OK na dev, ale na produkcji używaj migracji.

Jeśli w projekcie nie masz konfiguracji `.env`, zainstaluj `@nestjs/config`:

```bash
npm i @nestjs/config
```

---

## 4) Konfiguracja Sequelize w AppModule

### 4.1) Przykład `src/app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// Importuj moduły domenowe:
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '3306')),
        username: config.get<string>('DB_USER', 'root'),
        password: config.get<string>('DB_PASS', ''),
        database: config.get<string>('DB_NAME', 'nestjs_my'),

        // Modele:
        autoLoadModels: true,
        synchronize: config.get<string>('DB_SYNC', 'false') === 'true',

        logging: config.get<string>('DB_LOGGING', 'false') === 'true' ? console.log : false,

        // Opcjonalnie: ustawienia strefy czasu
        timezone: '+00:00',
      }),
    }),

    UsersModule,
  ],
})
export class AppModule {}
```

Najważniejsze opcje:
- `autoLoadModels: true` – automatycznie ładuje modele zarejestrowane przez `SequelizeModule.forFeature`.
- `synchronize: true` – automatycznie tworzy/aktualizuje tabele na podstawie modeli (tylko dev).

---

## 5) Przykładowa encja (Model) — User

Utwórz plik: `src/users/user.model.ts`

```ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  lastName: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(150))
  email: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
```

---

## 6) Moduł domenowy — UsersModule

### 6.1) `src/users/users.module.ts`

```ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

---

## 7) Serwis — UsersService (CRUD)

### 7.1) `src/users/users.service.ts`

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
};

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(dto: CreateUserDto) {
    return this.userModel.create(dto);
  }

  async findAll() {
    return this.userModel.findAll({ order: [['id', 'DESC']] });
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: Partial<CreateUserDto>) {
    const user = await this.findOne(id);
    await user.update(dto);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
    return { deleted: true };
  }
}
```

---

## 8) Kontroler — UsersController

### 8.1) `src/users/users.controller.ts`

```ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  create(@Body() body: { firstName: string; lastName: string; email: string }) {
    return this.users.create(body);
  }

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<{ firstName: string; lastName: string; email: string }>,
  ) {
    return this.users.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.users.remove(Number(id));
  }
}
```

---

## 9) Uruchomienie

1. Upewnij się, że MySQL działa i baza istnieje:

```sql
CREATE DATABASE nestjs_my CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Start aplikacji:

```bash
npm run start:dev
```

3. Test (np. curl):

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jan","lastName":"Kowalski","email":"jan.kowalski@example.com"}'
```

---

## 10) Migracje (opcjonalnie) zamiast `synchronize`

Na produkcji nie używaj `synchronize: true`. Zamiast tego:
- trzymaj `synchronize: false`
- użyj migracji

Najpopularniejsze podejścia:
- **sequelize-cli** (wymaga dodatkowej konfiguracji pod TS)
- **umzug** (bardziej “programowalne” migracje)

Jeśli chcesz, dopiszę osobną sekcję “Migracje w TS (umzug) + NestJS” pod Twoją strukturę projektu.

---

## 11) Typowe problemy

- **ER_ACCESS_DENIED_ERROR**: sprawdź `DB_USER/DB_PASS` i uprawnienia.
- **Unknown database**: utwórz bazę `DB_NAME`.
- **Timezone / daty**: ustaw `timezone` i rozważ konfigurację MySQL.
- **synchronize usuwa/zmienia schemat**: używaj tylko na dev.

---

## 12) Dalsze kroki

Możemy dodać:
- walidację DTO (`class-validator`, `class-transformer`)
- unikalność email + ładna obsługa błędów (np. `SequelizeUniqueConstraintError`)
- relacje (1:N, N:M) na przykładzie `User` ↔ `Post`