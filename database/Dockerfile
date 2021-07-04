FROM postgres:alpine
ARG PORT=5432
RUN apk upgrade libxml2
RUN apk --update add postgresql-client
EXPOSE $PORT