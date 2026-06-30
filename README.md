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
