
```markdown name=mysql_typeORM.md
# NestJS + MySQL + TypeORM — instrukcja konfiguracji i wykorzystania (krok po kroku)

Ten dokument pokazuje, jak skonfigurować **TypeORM** w aplikacji **NestJS** z bazą **MySQL**:
- instalacja paczek
- konfiguracja połączenia (env + ConfigModule)
- encje + relacje
- repozytoria (`Repository<T>`) w serwisie
- CRUD (Controller + Service)
- migracje (zalecane) vs `synchronize` (tylko dev)

> W repo masz też przykład TypeORM w katalogu `cw1-online-store` (TypeOrmModule.forRoot + forFeature).

---

## 0) Wymagania

- Node.js LTS
- NestJS (projekt wygenerowany przez `nest new ...`)
- MySQL 8.x (lub MariaDB)
- Dostęp do bazy (host/port/user/hasło)

---

## 1) Instalacja zależności

W katalogu projektu NestJS:

```bash
npm i @nestjs/typeorm typeorm mysql2
```

Opcjonalnie (jeśli chcesz config przez `.env`):
```bash
npm i @nestjs/config
```

**Co jest do czego:**
- `@nestjs/typeorm` — integracja TypeORM z NestJS
- `typeorm` — ORM
- `mysql2` — driver do MySQL

---

## 2) Przygotuj bazę danych (MySQL)

Przykładowo:

```sql
CREATE DATABASE nest_typeorm_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## 3) Zmienne środowiskowe (.env)

W root projektu dodaj plik `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=secret
DB_NAME=nest_typeorm_db

# dev only
DB_SYNC=true
DB_LOGGING=false
```

> `DB_SYNC=true` jest OK na start w DEV, ale docelowo używaj migracji.

---

## 4) Konfiguracja TypeORM w AppModule (wariant zalecany: forRootAsync + ConfigModule)

### 4.1) `src/app.module.ts` (przykład)

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '3306')),
        username: config.get<string>('DB_USER', 'root'),
        password: config.get<string>('DB_PASS', ''),
        database: config.get<string>('DB_NAME', 'nest_typeorm_db'),

        // Najprościej w Nest: auto-load encji z modułów
        autoLoadEntities: true,

        // DEV only (migracje na prod)
        synchronize: config.get<string>('DB_SYNC', 'false') === 'true',

        // Logi SQL
        logging: config.get<string>('DB_LOGGING', 'false') === 'true',
      }),
    }),

    ProductsModule,
  ],
})
export class AppModule {}
```

**Ważne:**
- `autoLoadEntities: true` pozwala nie podawać ręcznie `entities: [...]`.
- `synchronize: true` **nie** jest zalecane na produkcji (może usuwać/zmieniać schemat).

---

## 5) Utwórz moduł domenowy (np. Products)

### 5.1) Wygeneruj zasób (opcjonalnie)

```bash
nest g resource products
```

Lub ręcznie:

```bash
nest g module products
nest g service products
nest g controller products
```

---

## 6) Encja TypeORM (Product)

Przykład encji: `src/products/product.entity.ts`

```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;
}
```

**Uwagi:**
- Dla `decimal` w MySQL często dostajesz string w JS — to normalne (kwestia precyzji). Jeśli chcesz number, rozważ transformery.

---

## 7) Podłącz encję w module (forFeature)

`src/products/products.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

---

## 8) DTO (Create/Update)

`src/products/dto/create-product.dto.ts`:

```ts
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}
```

`src/products/dto/update-product.dto.ts`:

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

Jeśli nie masz:
```bash
npm i class-validator class-transformer
npm i @nestjs/mapped-types
```

---

## 9) Serwis: Repository<Product>

`src/products/products.service.ts`:

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.repo.remove(product);
    return { deleted: true };
  }
}
```

---

## 10) Kontroler: CRUD endpoints

`src/products/products.controller.ts`:

```ts
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }

  @Get()
  findAll() {
    return this.products.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.products.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.products.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.products.remove(id);
  }
}
```

---

## 11) Uruchomienie

1. Uruchom MySQL (docker lub lokalnie)
2. Ustaw `.env`
3. Start Nest:

```bash
npm run start:dev
```

Test:
- `GET http://localhost:3000/products`
- `POST http://localhost:3000/products` z body:
```json
{ "name": "Keyboard", "price": 199.99 }
```

---

## 12) Synchronize vs Migracje

### 12.1) DEV (szybko): `synchronize: true`
- TypeORM automatycznie stworzy tabele na podstawie encji
- ryzykowne na prod

### 12.2) Zalecane: migracje

**Minimalna konfiguracja** zwykle wymaga pliku `typeorm.config.ts` albo ustawień dla CLI (zależnie od struktury projektu).
Ponieważ w Nest często używa się `forRootAsync`, najprościej:
- trzymać osobny DataSource dla migracji (CLI),
- a w Nest nadal używać `ConfigService`.

Przykładowy plik `src/database/data-source.ts`:

```ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from '../products/product.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASS ?? '',
  database: process.env.DB_NAME ?? 'nest_typeorm_db',
  entities: [Product],
  migrations: ['dist/migrations/*.js'],
});
```

Następnie (po dostrojeniu pod projekt) typowe komendy:
```bash
# przykład (zależnie od wersji typeorm i setupu)
npx typeorm migration:generate dist/migrations/init -d dist/database/data-source.js
npx typeorm migration:run -d dist/database/data-source.js
```

> Migracje są najbardziej “produkcyjną” metodą. Jeśli chcesz, dopasuję gotowy setup CLI pod konkretny katalog w repo (np. `cw1-online-store` albo inny projekt w monorepo).

---

## 13) Najczęstsze problemy (checklista)

- **Brak połączenia**: czy MySQL działa, czy host/port poprawne
- **Access denied**: user/hasło
- **`Unknown database`**: DB_NAME nie istnieje
- **Encje nie tworzą tabel**:
  - czy `synchronize: true` w DEV?
  - czy encja jest dołączona (`autoLoadEntities: true` + `forFeature([Entity])`)?
- **Zmiany w encjach nie widać**: restart `start:dev`, usuń cache/build, upewnij się, że to właściwe env

---

## 14) Rozszerzenia (opcjonalnie)

- relacje `@ManyToOne/@OneToMany`, eager/lazy loading
- transakcje (`QueryRunner`)
- soft delete (`@DeleteDateColumn`)
- pagination + filtracja (QueryBuilder)

```

Jeśli chcesz, żebym dopasował tę instrukcję **dokładnie do jednego konkretnego projektu w repo** (bo wygląda na to, że repo zawiera kilka ćwiczeń / podprojektów), napisz proszę, którego katalogu ma dotyczyć:
- `cw1-online-store` (już ma TypeORM w `src/app.module.ts`)
- czy inny (podaj ścieżkę).

## @tiszczesz

poproszę link do md

## Copilot

Nie mogę wkleić “klikalnego” linku jako zwykły URL w tej rozmowie, ale masz poniżej **gotowy link (do wklejenia w przeglądarkę)** do wyszukania/otwarcia pliku po dodaniu go do repo.

Najpierw dodaj plik `mysql_typeORM.md` do repo (np. w root). Potem otworzysz go tutaj:

```text name=link.txt
https://github.com/tiszczesz/nestjs-my/blob/main/mysql_typeORM.md
```

Jeśli wrzucisz go do innego katalogu (np. `docs/`), to link będzie:

```text name=link-docs.txt
https://github.com/tiszczesz/nestjs-my/blob/main/docs/mysql_typeORM.md
```

Jeśli chcesz, mogę też przygotować PR z dodaniem tego pliku — napisz tylko: **“zrób PR”** i potwierdź, czy plik ma trafić do **root** czy do **docs/**.

## @tiszczesz

poproszę o ponowne wygenerowanie pliku md bo wydaje się niepełny

## Copilot

```markdown name=mysql_typeORM.md
# NestJS + MySQL + TypeORM — instrukcja konfiguracji i wykorzystania (krok po kroku)

Ten dokument pokazuje, jak skonfigurować **TypeORM** w aplikacji **NestJS** z bazą **MySQL**:
- instalacja paczek
- konfiguracja połączenia (ENV + `@nestjs/config`)
- encje i relacje
- praca na `Repository<T>` w serwisie
- CRUD (Controller + Service)
- migracje (zalecane) vs `synchronize` (tylko dev)
- krótkie tipy/debug

> Data rozmowy: **2026-03-06**.

---

## 0) Wymagania

- Node.js LTS
- NestJS (projekt wygenerowany przez `nest new ...`)
- MySQL 8.x (lub MariaDB)
- Dane dostępowe do bazy: host/port/user/hasło/nazwa bazy

---

## 1) Instalacja zależności

W katalogu projektu NestJS:

```bash
npm i @nestjs/typeorm typeorm mysql2
```

Jeśli chcesz używać `.env` i wygodnie czytać zmienne w Nest:

```bash
npm i @nestjs/config
```

Walidacja DTO (często i tak jest w Nest):

```bash
npm i class-validator class-transformer
```

Dla wygodnego `PartialType` w update DTO:

```bash
npm i @nestjs/mapped-types
```

---

## 2) Uruchom MySQL (lokalnie lub Docker)

### 2.1) Opcja: Docker (przykład)

```bash
docker run --name mysql8-nest \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=nest_typeorm_db \
  -p 3306:3306 \
  -d mysql:8
```

Sprawdź logi:

```bash
docker logs -f mysql8-nest
```

---

## 3) Zmienne środowiskowe `.env`

W root projektu dodaj `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=secret
DB_NAME=nest_typeorm_db

# DEV ONLY:
DB_SYNC=true
DB_LOGGING=false
```

**Uwagi:**
- `DB_SYNC=true` tylko na DEV (automatycznie tworzy/zmienia tabele).
- Docelowo na produkcji: `DB_SYNC=false` + migracje.

---

## 4) Konfiguracja TypeORM w NestJS (zalecane: `forRootAsync`)

### 4.1) `src/app.module.ts` — konfiguracja globalna DB

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '3306')),
        username: config.get<string>('DB_USER', 'root'),
        password: config.get<string>('DB_PASS', ''),
        database: config.get<string>('DB_NAME', 'nest_typeorm_db'),

        /**
         * autoLoadEntities = TypeORM bierze encje podłączone w modułach przez forFeature(...)
         * (nie musisz ręcznie wpisywać `entities: [...]`)
         */
        autoLoadEntities: true,

        /**
         * synchronize = automatyczna synchronizacja schematu z encji
         * Używaj tylko na DEV.
         */
        synchronize: config.get<string>('DB_SYNC', 'false') === 'true',

        /**
         * logging = logowanie SQL
         */
        logging: config.get<string>('DB_LOGGING', 'false') === 'true',
      }),
    }),

    ProductsModule,
  ],
})
export class AppModule {}
```

---

## 5) Globalna walidacja DTO (opcjonalnie, ale polecane)

W `src/main.ts`:

```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
```

---

## 6) Struktura przykładowego modułu (Products)

Załóżmy, że robimy moduł `products`.

### 6.1) Generowanie (opcjonalnie)

```bash
nest g module products
nest g service products
nest g controller products
```

Docelowo:
```
src/
  products/
    dto/
      create-product.dto.ts
      update-product.dto.ts
    product.entity.ts
    products.controller.ts
    products.module.ts
    products.service.ts
```

---

## 7) Encja TypeORM (Product)

`src/products/product.entity.ts`:

```ts
import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  /**
   * DECIMAL w MySQL może wracać jako string (kwestia precyzji).
   * Dla prostych przykładów zostawiamy jak jest.
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: string; // albo number + transformer
}
```

> Jeśli wolisz `number` dla `price`, daj znać — dopiszę transformer.

---

## 8) DTO (Create / Update)

`src/products/dto/create-product.dto.ts`:

```ts
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}
```

`src/products/dto/update-product.dto.ts`:

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

---

## 9) Podłączenie encji w module (TypeOrmModule.forFeature)

`src/products/products.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

---

## 10) Serwis: `Repository<Product>` (CRUD)

`src/products/products.service.ts`:

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const entity = this.repo.create({
      name: dto.name,
      // zapisuj jako string jeśli encja ma price: string
      price: dto.price.toFixed(2),
    });

    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Product ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateProductDto) {
    const entity = await this.findOne(id);

    if (dto.name !== undefined) entity.name = dto.name;
    if (dto.price !== undefined) entity.price = dto.price.toFixed(2);

    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return { deleted: true };
  }
}
```

---

## 11) Kontroler: endpointy REST

`src/products/products.controller.ts`:

```ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }

  @Get()
  findAll() {
    return this.products.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.products.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.products.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.products.remove(id);
  }
}
```

---

## 12) Test manualny (curl)

### 12.1) Start

```bash
npm run start:dev
```

### 12.2) Dodaj produkt

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","price":199.99}'
```

### 12.3) Lista

```bash
curl http://localhost:3000/products
```

### 12.4) Szczegóły

```bash
curl http://localhost:3000/products/1
```

### 12.5) Update

```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":149.99}'
```

### 12.6) Delete

```bash
curl -X DELETE http://localhost:3000/products/1
```

---

## 13) Relacje (przykład: Category -> Products)

Poniżej minimalny przykład relacji **Many-to-One / One-to-Many**.

### 13.1) Encja Category

`src/categories/category.entity.ts`:

```ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @OneToMany(() => Product, (p) => p.category)
  products: Product[];
}
```

### 13.2) Dodaj pole `category` do Product

`src/products/product.entity.ts` (dopisz):

```ts
import { ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../categories/category.entity';

@ManyToOne(() => Category, (c) => c.products, { nullable: true })
@JoinColumn({ name: 'category_id' })
category: Category | null;
```

### 13.3) Pobieranie relacji (z `relations`)

W serwisie:

```ts
return this.repo.find({ relations: { category: true } });
```

---

## 14) Migracje (zalecane podejście) — szkic konfiguracji

Na DEV możesz używać `synchronize: true`, ale do “poważniejszego” projektu:
- `synchronize: false`
- migracje

W TypeORM 0.3+ migracje idą przez `DataSource`.

### 14.1) Przykładowy DataSource do migracji

Utwórz plik: `src/database/data-source.ts`

```ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';

// importuj encje, które mają być uwzględniane w migracjach:
import { Product } from '../products/product.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASS ?? '',
  database: process.env.DB_NAME ?? 'nest_typeorm_db',

  entities: [Product],

  // migracje zwykle w dist:
  migrations: ['dist/migrations/*.js'],

  // na migracje:
  synchronize: false,
  logging: false,
});
```

### 14.2) Skrypty w `package.json` (przykład)

To może się różnić zależnie od struktury projektu (TS/ESM, ścieżki build itd.),
ale idea jest taka:

```json
{
  "scripts": {
    "build": "nest build",
    "typeorm": "typeorm",
    "migration:generate": "npm run build && npx typeorm migration:generate dist/migrations/init -d dist/database/data-source.js",
    "migration:run": "npm run build && npx typeorm migration:run -d dist/database/data-source.js"
  }
}
```

> Jeśli podasz mi **konkretny katalog projektu** w repo (np. `cw1-online-store`), mogę dopasować dokładne ścieżki i skrypty pod Twoją strukturę builda.

---

## 15) Najczęstsze problemy (debug)

1. **ECONNREFUSED / brak połączenia**  
   - czy MySQL działa? (docker/serwis)
   - czy `DB_HOST` jest poprawny (uwaga na Docker networking)

2. **Access denied for user**  
   - złe hasło lub user nie ma uprawnień

3. **Unknown database**  
   - baza nie istnieje (`DB_NAME`)

4. **Encje się nie ładują / brak tabel**  
   - czy masz `autoLoadEntities: true`?
   - czy dodałeś encję do `TypeOrmModule.forFeature([Entity])` w module?
   - czy `DB_SYNC=true` na DEV?

5. **Zmiany w encjach nie wchodzą**  
   - restart `start:dev`
   - jeśli `synchronize=false`, to bez migracji schemat się nie zmieni

---

## 16) Minimalny “szybki start” (TL;DR)

1. `npm i @nestjs/typeorm typeorm mysql2 @nestjs/config class-validator class-transformer`
2. `.env` z `DB_*`
3. `TypeOrmModule.forRootAsync(...)` w `AppModule`
4. Encja + `TypeOrmModule.forFeature([Entity])`
5. Serwis na `Repository<Entity>`
6. Kontroler CRUD
7. DEV: `DB_SYNC=true`, PROD: migracje

```

```text name=link.txt
https://github.com/tiszczesz/nestjs-my/blob/main/mysql_typeORM.md
```

Jeśli chcesz, mogę jeszcze:
- dopisać wersję instrukcji **dokładnie pod `cw1-online-store/`** (tam już masz TypeORM w `app.module.ts`),
- albo zrobić wariant z **`entities: ['dist/**/*.entity{.ts,.js}']`** identyczny jak w Twoim przykładzie z repo.

## @tiszczesz

jak to pobrać?

## Copilot

```markdown name=mysql_typeORM.md
# NestJS + MySQL + TypeORM — instrukcja konfiguracji i wykorzystania (krok po kroku)

Ten dokument pokazuje, jak skonfigurować **TypeORM** w aplikacji **NestJS** z bazą **MySQL**:
- instalacja paczek
- konfiguracja połączenia (ENV + `@nestjs/config`)
- encje i relacje
- praca na `Repository<T>` w serwisie
- CRUD (Controller + Service)
- migracje (zalecane) vs `synchronize` (tylko dev)
- krótkie tipy/debug

> Data rozmowy: **2026-03-06**.

---

## 0) Wymagania

- Node.js LTS
- NestJS (projekt wygenerowany przez `nest new ...`)
- MySQL 8.x (lub MariaDB)
- Dane dostępowe do bazy: host/port/user/hasło/nazwa bazy

---

## 1) Instalacja zależności

W katalogu projektu NestJS:

```bash
npm i @nestjs/typeorm typeorm mysql2
```
```

Masz 3 najprostsze opcje (wybierz jedną):

## Opcja A — skopiuj z czatu do pliku lokalnie (najszybciej)
1. Skopiuj całą treść, którą wkleiłem wyżej (docelowo cały plik `mysql_typeORM.md`).
2. W swoim projekcie utwórz plik:
   - Windows: `mysql_typeORM.md` w folderze repo
   - Linux/macOS: jw.
3. Zapisz.

Jeśli chcesz z terminala:

```bash name=create-file.sh
# w katalogu repo:
nano mysql_typeORM.md
# wklej treść, zapisz (Ctrl+O) i wyjdź (Ctrl+X)
```

## Opcja B — dodaj plik na GitHub przez przeglądarkę
1. Wejdź do repo: `tiszczesz/nestjs-my`
2. Kliknij **Add file → Create new file**
3. Nazwa pliku: `mysql_typeORM.md`
4. Wklej treść
5. **Commit changes**

Potem plik będzie do pobrania z:
```text name=link.txt
https://github.com/tiszczesz/nestjs-my/blob/main/mysql_typeORM.md
```

## Opcja C — “Download raw” (pobierz jako czysty tekst z GitHuba)
Działa dopiero gdy plik już istnieje w repo.

1. Otwórz plik w GitHub (link jak wyżej)
2. Kliknij **Raw**
3. Zapisz stronę jako plik (Ctrl+S) albo skopiuj treść

Alternatywnie “raw link” (do wklejenia w przeglądarkę), gdy plik już jest:
```text name=raw-link.txt
https://raw.githubusercontent.com/tiszczesz/nestjs-my/main/mysql_typeORM.md
```

Jeśli powiesz mi, czy chcesz dodać ten plik do **root repo**, czy np. do katalogu `docs/`, to podam dokładny link docelowy i krótką instrukcję “klik po kliku” pod Twoją ścieżkę.
