# Room Flow

Laravel project with Inertia and React.

## Requirements

- PHP 8.3 or higher
- Composer
- Node.js and npm

## Installation

Install the project dependencies:

```bash
composer install
npm install
```

Copy the environment file and generate the application key:

```bash
cp .env.example .env
php artisan key:generate
```

Prepare the database:

```bash
php artisan migrate
```

## Factory password

The default password used by the user factory is configured in `.env`:

```env
USER_FACTORY_PASSWORD=password
```

Use this value when signing in with users created by factories or seeders.

## Admin path

Authenticated routes are grouped under the admin path configured in `.env`:

```env
ADMIN_PATH=admin
```

For example, changing it to `backoffice` will move the dashboard to:

```txt
/backoffice/dashboard
```

After changing `ADMIN_PATH`, refresh the Laravel config, regenerate frontend route helpers, and rebuild the assets:

```bash
php artisan config:clear
php artisan wayfinder:generate --with-form
npm run build
```

## Run the project

Start the development environment:

```bash
composer run dev
```

The application will be available at the URL configured in `.env`.

## Run with Docker

Create the Docker network used by the services:

```bash
docker network inspect room-flow-network >/dev/null 2>&1 || docker network create room-flow-network
```

Copy the environment file and configure the local URL:

```bash
cp .env.example .env
```

Update `.env`:

```env
APP_URL=http://localhost:8085
DB_CONNECTION=sqlite
```

Create the SQLite database file if it does not exist:

```bash
touch database/database.sqlite
```

Build the image and install PHP dependencies:

```bash
docker compose build
docker compose run --rm room-flow composer install
```

Generate the application key and run migrations:

```bash
docker compose run --rm room-flow php artisan key:generate
docker compose run --rm room-flow php artisan migrate
```

Start the application:

```bash
docker compose up -d
```

The application will be available at:

```txt
http://localhost:8085
```

Vite will be available at:

```txt
http://localhost:5173
```

Useful Docker commands:

```bash
docker compose ps
docker compose logs -f room-flow
docker compose logs -f room-flow-node
docker compose down
```
