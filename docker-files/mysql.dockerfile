FROM mysql:5.7

MAINTAINER me


ADD mercycare.sql /docker-entrypoint-initdb.d

EXPOSE 3306
