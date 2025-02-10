FROM node:18

WORKDIR /app

# TODO: set up workspaces to further isolate DBSeeder
# COPY ./src/services/DBSeeder/package*.json ./
COPY ./package*.json ./

RUN npm install

# COPY ./src/services/DBSeeder/tsconfig.json ./
COPY ./tsconfig.json ./

COPY ./src/services/DBSeeder ./src/services/DBSeeder
COPY ./src/db/schemas.ts ./src/db/schemas.ts
COPY ./src/modules/user/user.types.ts ./src/modules/user/user.types.ts
COPY ./src/modules/post/post.types.ts ./src/modules/post/post.types.ts
COPY ./src/modules/restaurant/restaurant.types.ts ./src/modules/restaurant/restaurant.types.ts
COPY ./src/types/MongooseTypes.ts ./src/types/MongooseTypes.ts

RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

# RUN npm run compile-seeder
RUN npm run compile
