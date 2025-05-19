FROM node:20-alpine AS builder

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:20-alpine

WORKDIR /apps

COPY --from=builder /src/dist ./dist
COPY --from=builder /src/package*.json ./
COPY --from=builder /src/prisma ./prisma
COPY --from=builder /src/node_modules ./node_modules


EXPOSE 8080

CMD ["node", "dist/server.js"]
