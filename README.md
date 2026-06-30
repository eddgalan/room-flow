# Room Flow

Laravel project with Inertia and React.

## Requirements

- PHP 8.3 or higher
- Composer
- Node.js y npm

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

## Run the project

Start the development environment:

```bash
composer run dev
```

The application will be available at the URL configured in `.env`.
