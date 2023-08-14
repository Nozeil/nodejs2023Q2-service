FROM node:18-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

FROM node:18-alpine As lightweight_development

COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node --from=development /app/prisma ./prisma
COPY --chown=node:node --from=development /app/src ./src
COPY --chown=node:node --from=development /app/tsconfig*.json ./
COPY --chown=node:node --from=development /app/doc ./doc
COPY --chown=node:node --from=development /app/nest-cli.json ./nest-cli.json

RUN npx prisma generate

CMD npx prisma migrate deploy && npx nest start --watch