# Swagger (NestJS) — instalacja i ustawienie typów w opisach

Poniższa instrukcja pokazuje:
1) instalację Swaggera w NestJS  
2) konfigurację endpointu `/docs`  
3) jak poprawnie opisywać **typy** i **modele** (DTO) tak, żeby Swagger generował poprawne schematy

---

## 1) Instalacja

```bash
npm install @nestjs/swagger swagger-ui-express
```

---

## 2) (Opcjonalnie, ale zalecane) Swagger CLI Plugin

Dzięki pluginowi Nest CLI Swagger lepiej “czyta” typy z TypeScript i `class-validator`.

Dodaj do **`nest-cli.json`** (lub `nest-cli.json` w projekcie):

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": [
      {
        "name": "@nestjs/swagger/plugin",
        "options": {
          "classValidatorShim": true,
          "introspectComments": true,
          "dtoFileNameSuffix": [".dto.ts", ".entity.ts"],
          "controllerFileNameSuffix": ".controller.ts"
        }
      }
    ]
  }
}
```

Uwaga: plugin skanuje pliki po suffixach (`.dto.ts`, `.entity.ts`, `.controller.ts`) — warto trzymać się tej konwencji.

---

## 3) Konfiguracja w `main.ts`

W **`src/main.ts`** dodaj konfigurację:

```ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// ...

const swaggerConfig = new DocumentBuilder()
  .setTitle('Mój Projekt w Nest')
  .setDescription('Przykładowy projekt w Node.js i TypeScript')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, swaggerConfig);

SwaggerModule.setup('docs', app, document, {
  swaggerOptions: { persistAuthorization: true },
});
```

Po uruchomieniu aplikacji:
- UI: `http://localhost:3000/docs`
- JSON: `http://localhost:3000/docs-json`

---

## 4) Typy i opisy modeli (DTO) — `@ApiProperty` / `@ApiPropertyOptional`

### 4.1 Podstawowy DTO

Przykład (u Ciebie podobnie w `UsersDto`):

```ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UsersDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;
}
```

### 4.2 Lepszy opis: `example`, `description`, `minLength`, `maxLength`

```ts
import { ApiProperty } from '@nestjs/swagger';

export class UsersDto {
  @ApiProperty({ example: '1', description: 'Unikalny identyfikator użytkownika' })
  id: string;

  @ApiProperty({
    example: 'Jan Kowalski',
    description: 'Nazwa użytkownika',
    minLength: 3,
    maxLength: 50,
  })
  name: string;
}
```

---

## 5) Typy w endpointach (kontroler) — `@ApiResponse({ type: ... })`

W kontrolerze warto jawnie ustawić `type`, żeby Swagger generował poprawny schemat:

- lista:
```ts
@ApiResponse({ status: 200, description: 'List of users', type: [UsersDto] })
```

- pojedynczy obiekt:
```ts
@ApiResponse({ status: 200, description: 'User', type: UsersDto })
```

---

## 6) Typy “trudniejsze”: enumy, tablice, liczby, daty, obiekty zagnieżdżone

### 6.1 Enum

```ts
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @ApiProperty({ enum: Role, example: Role.USER })
  role: Role;
}
```

### 6.2 Tablica stringów / tablica DTO

```ts
import { ApiProperty } from '@nestjs/swagger';

export class GroupDto {
  @ApiProperty({ type: [String], example: ['a', 'b'] })
  tags: string[];
}

export class BulkCreateDto {
  @ApiProperty({ type: () => [CreateUserDto] })
  users: CreateUserDto[];
}
```

### 6.3 Liczba (czasem warto wymusić typ)

```ts
@ApiProperty({ type: Number, example: 18, description: 'Wiek użytkownika' })
age: number;
```

### 6.4 Date

```ts
@ApiProperty({ type: String, format: 'date-time', example: '2026-03-06T10:15:00.000Z' })
createdAt: Date;
```

---

## 7) Body jako tablica w kontrolerze — `@ApiBody`

Gdy endpoint przyjmuje tablicę w body (np. bulk create), dodaj `@ApiBody`:

```ts
import { ApiBody } from '@nestjs/swagger';
import { Body, Post } from '@nestjs/common';

@Post('bulk')
@ApiBody({ type: [CreateUserDto] })
bulkCreate(@Body() users: CreateUserDto[]) {
  return users;
}
```

---

## 8) Ważne: interface vs class

Swagger w NestJS najlepiej działa na **klasach** (DTO jako `class`), a nie na `interface`.
- `interface` jest usuwany w runtime, więc Swagger nie ma “materiału”, by zbudować schemat.
- Jeśli musisz mieć `interface`, to DTO i tak powinien być klasą (ew. `implements`).

---

## 9) Checklist (szybka kontrola)

- [ ] `npm i @nestjs/swagger swagger-ui-express`
- [ ] Swagger setup w `main.ts`
- [ ] (Opcjonalnie) plugin `@nestjs/swagger/plugin` w `nest-cli.json`
- [ ] DTO jako `class`, pola dekorowane `@ApiProperty(...)`
- [ ] Kontrolery opisane `@ApiTags`, endpointy `@ApiOperation`, `@ApiResponse({ type: ... })`
- [ ] Dla bulk body / niestandardowych body: `@ApiBody(...)`

---