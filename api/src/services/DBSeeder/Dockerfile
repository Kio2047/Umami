FROM node:18

WORKDIR /seeder

COPY ./package*.json .

RUN npm install

COPY . .

RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

RUN npm run compile-seeder
