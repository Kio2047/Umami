FROM node:18

WORKDIR /app

# TODO: set up workspaces to further isolate DBSeeder
# COPY ./src/services/DBSeeder/package*.json ./
COPY ./package*.json ./

RUN npm install

# COPY ./src/services/DBSeeder/tsconfig.json ./
COPY ./tsconfig.json ./

COPY ./src/services/DBSeeder ./src/services/DBSeeder
COPY ./src/Models/schemas.ts ./src/models/schemas.ts
COPY ./src/types/UserTypes.ts ./src/types/UserTypes.ts
COPY ./src/types/PostTypes.ts ./src/types/PostTypes.ts
COPY ./src/types/RestaurantTypes.ts ./src/types/RestaurantTypes.ts
COPY ./src/types/MongooseCRUDTypes.ts ./src/types/MongooseCRUDTypes.ts


RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

# RUN npm run compile-seeder
RUN npm run compile
