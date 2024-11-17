###################
# BUILD FOR PRODUCTION
###################

FROM node:22-alpine AS build

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci --legacy-peer-deps

COPY --chown=node:node . .

RUN npx prisma generate

RUN npm run build

USER node

###################
# PRODUCTION
###################

FROM node:22-alpine AS production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/prisma ./prisma

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
