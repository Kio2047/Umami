FROM node:18

WORKDIR /seeder

COPY ./package*.json .

RUN npm install

COPY . .

RUN npm run compile-seeder
