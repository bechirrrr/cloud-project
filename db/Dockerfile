# db/Dockerfile
FROM postgres:15-alpine

# Copier les scripts d'initialisation
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432