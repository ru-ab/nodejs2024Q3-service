FROM node:22-alpine AS build

USER node

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci --legacy-peer-deps --omit=dev && npm cache clean --force

COPY --chown=node:node . .

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
