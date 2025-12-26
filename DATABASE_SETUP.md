# Instrucciones de Configuración de Base de Datos

## Opción 1: PostgreSQL Local (XAMPP/Standalone)

### Con XAMPP (incluye PostgreSQL)

1. Instalar XAMPP con PostgreSQL
2. Iniciar el servicio PostgreSQL desde el panel de control de XAMPP
3. Abrir pgAdmin (incluido con PostgreSQL) o usar línea de comandos
4. Crear la base de datos:

```sql
CREATE DATABASE mini_netflix;
```

### Con PostgreSQL Standalone

1. Descargar e instalar PostgreSQL desde: https://www.postgresql.org/download/
2. Durante la instalación, recordar la contraseña del usuario `postgres`
3. Abrir pgAdmin o usar psql:

```bash
psql -U postgres
```

4. Crear la base de datos:

```sql
CREATE DATABASE mini_netflix;
```

### Configurar .env

Actualizar el archivo `.env` con las credenciales correctas:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=TU_CONTRASEÑA_AQUI
DB_DATABASE=mini_netflix
JWT_SECRET=cambiar-este-secreto-en-produccion
JWT_EXPIRES_IN=24h
PORT=3000
```

## Opción 2: PostgreSQL en la Nube (Gratis)

### Render.com (Recomendado)

1. Crear cuenta en https://render.com
2. Crear un nuevo PostgreSQL Database (plan gratuito)
3. Copiar las credenciales de conexión
4. Actualizar `.env` con los datos proporcionados

### Supabase

1. Crear cuenta en https://supabase.com
2. Crear nuevo proyecto
3. Ir a Settings > Database
4. Copiar las credenciales de conexión
5. Actualizar `.env`

### ElephantSQL

1. Crear cuenta en https://www.elephantsql.com
2. Crear nueva instancia (plan Tiny Turtle - gratuito)
3. Copiar la URL de conexión
4. Parsear la URL y actualizar `.env`

## Verificar Conexión

Después de configurar la base de datos, ejecutar:

```bash
npm run start:dev
```

Si todo está correcto, verás en la consola:
```
Application is running on port 3000
```

Y TypeORM creará automáticamente las tablas necesarias.

## Problemas Comunes

### Error: "password authentication failed"
- Verificar que la contraseña en `.env` sea correcta
- Verificar que el usuario tenga permisos

### Error: "database does not exist"
- Crear la base de datos manualmente con el comando SQL
- Verificar que el nombre en `.env` coincida

### Error: "connect ECONNREFUSED"
- Verificar que PostgreSQL esté corriendo
- Verificar que el puerto sea 5432
- Verificar que el host sea correcto
