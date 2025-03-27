FROM node:18

RUN corepack enable && corepack prepare pnpm@10.7.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY api/package.json api/tsconfig.json ./api/

RUN pnpm approve-builds

RUN pnpm install --filter=api... --frozen-lockfile

COPY api/src/services/DBSeeder ./api/src/services/DBSeeder
COPY api/src/db/schemas.ts ./api/src/db/schemas.ts
COPY api/src/modules/user/user.types.ts ./api/src/modules/user/user.types.ts
COPY api/src/modules/post/post.types.ts ./api/src/modules/post/post.types.ts
COPY api/src/modules/restaurant/restaurant.types.ts ./api/src/modules/restaurant/restaurant.types.ts
COPY api/src/types/MongooseTypes.ts ./api/src/types/MongooseTypes.ts

RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

RUN pnpm --filter=api run compile