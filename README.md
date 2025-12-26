# Mini-Netflix Backend

Backend API RESTful para plataforma de streaming construido con NestJS, PostgreSQL y TypeORM.

## Descripción

Sistema de gestión de catálogo de contenidos que permite administrar Series y Episodios con autenticación JWT.

## Características

- CRUD completo para Series y Episodios
- Relación One-to-Many (Una Serie tiene múltiples Episodios)
- Autenticación JWT stateless
- Validación automática de DTOs
- Rutas públicas (GET) y privadas (POST, PATCH, DELETE)
- Base de datos PostgreSQL con TypeORM

## Tecnologías

- NestJS 10
- TypeORM 0.3
- PostgreSQL
- JWT (JSON Web Tokens)
- Class Validator
- Passport

## Requisitos

- Node.js >= 18
- PostgreSQL >= 12
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd mini-netflix-backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:

Crear archivo `.env` basado en `.env.example`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=mini_netflix
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
PORT=3000
```

4. Crear la base de datos en PostgreSQL:
```sql
CREATE DATABASE mini_netflix;
```

## Ejecución

Desarrollo:
```bash
npm run start:dev
```

Producción:
```bash
npm run build
npm run start:prod
```

## Endpoints

### Autenticación

**POST** `/auth/login`
- Body: `{ "username": "admin", "password": "admin123" }`
- Response: `{ "access_token": "..." }`

### Series

**GET** `/series` - Listar todas las series (público)
- Response: Array de series con sus episodios anidados

**GET** `/series/:id` - Obtener una serie (público)

**POST** `/series` - Crear serie (requiere token)
- Headers: `Authorization: Bearer <token>`
- Body:
```json
{
  "titulo": "Stranger Things",
  "genero": "Ciencia ficción",
  "sinopsis": "Descripción de la serie",
  "urlPortada": "https://example.com/poster.jpg"
}
```

**PATCH** `/series/:id` - Actualizar serie (requiere token)
- Headers: `Authorization: Bearer <token>`

**DELETE** `/series/:id` - Eliminar serie (requiere token)
- Headers: `Authorization: Bearer <token>`

### Episodios

**GET** `/episodios` - Listar todos los episodios (público)

**GET** `/episodios/:id` - Obtener un episodio (público)

**POST** `/episodios` - Crear episodio (requiere token)
- Headers: `Authorization: Bearer <token>`
- Body:
```json
{
  "titulo": "Capítulo 1",
  "duracion": 45,
  "numeroCapitulo": 1,
  "serieId": 1
}
```

**PATCH** `/episodios/:id` - Actualizar episodio (requiere token)
- Headers: `Authorization: Bearer <token>`

**DELETE** `/episodios/:id` - Eliminar episodio (requiere token)
- Headers: `Authorization: Bearer <token>`

## Validaciones

El sistema valida automáticamente:
- Campos requeridos no vacíos
- Tipos de datos correctos
- URLs válidas para portadas
- Números positivos para duraciones y números de capítulo
- Elimina automáticamente campos no definidos en DTOs (whitelist)

## Modelo de Datos

### Serie
- id: number (auto)
- titulo: string (requerido)
- genero: string (requerido)
- sinopsis: text (requerido)
- urlPortada: string URL (requerido)
- episodios: Episodio[] (relación)

### Episodio
- id: number (auto)
- titulo: string (requerido)
- duracion: number (requerido, positivo)
- numeroCapitulo: number (requerido, positivo)
- serieId: number (requerido, foreign key)
- serie: Serie (relación)

## Seguridad

- ValidationPipe global con whitelist activado
- JWT para autenticación stateless
- Guards en rutas de modificación
- Credenciales por defecto (cambiar en producción):
  - Username: `admin`
  - Password: `admin123`

## Despliegue en Render

1. Crear cuenta en Render.com
2. Crear PostgreSQL Database
3. Crear Web Service
4. Conectar repositorio de GitHub
5. Configurar variables de entorno en Render
6. Build Command: `npm install && npm run build`
7. Start Command: `npm run start:prod`

## Estructura del Proyecto

```
src/
├── auth/                 # Módulo de autenticación
│   ├── dto/
│   ├── guards/
│   ├── strategies/
│   └── auth.module.ts
├── series/              # Módulo de series
│   ├── dto/
│   ├── entities/
│   └── series.module.ts
├── episodios/           # Módulo de episodios
│   ├── dto/
│   ├── entities/
│   └── episodios.module.ts
├── app.module.ts
└── main.ts
```

## Autor

Proyecto desarrollado para examen de Backend

## Licencia

MIT
