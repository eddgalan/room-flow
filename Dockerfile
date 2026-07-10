FROM php:8.4-apache-bookworm
WORKDIR /var/www/html
RUN apt-get update -y && apt-get install -y curl openssl zip git unzip lsb-release apt-transport-https ca-certificates wget nano
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libonig-dev \
    libicu-dev \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    libpng-dev \
    libjpeg-dev \
    libzip-dev \
    zlib1g-dev \
    libfreetype6-dev \
    pkg-config \
    zip unzip git
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install \
      pdo_mysql \
      bcmath \
      intl \
      zip \
      gd \
      pcntl \
      sockets
ARG INSTALL_XDEBUG=false
RUN if [ "$INSTALL_XDEBUG" = "true" ]; then \
    pecl install xdebug && docker-php-ext-enable xdebug ; \
fi
RUN rm -rf /var/lib/apt/lists/*
RUN a2enmod rewrite
COPY docker/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY docker/apache2.conf /etc/apache2/apache2.conf
ENV PHP_INI_FILE php.ini
COPY --from=composer:2.10.1 /usr/bin/composer /usr/bin/composer
# RUN chown -R www-data:www-data storage bootstrap/cache
