FROM php:7.4-fpm

WORKDIR /var/www/html


RUN docker-php-ext-install pdo pdo_mysql
RUN chown -R www-data:www-data /var/www/html
# RUN sudo chmod -R 644 /var/www/html/app/storage
# RUN sudo chmod -R 755 /var/www/html/app/storage

