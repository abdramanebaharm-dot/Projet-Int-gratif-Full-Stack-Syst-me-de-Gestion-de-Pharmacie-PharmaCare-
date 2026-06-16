FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src ./src

RUN npx prisma generate --schema=src/prisma/schema.prisma

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy --schema=src/prisma/schema.prisma && node src/server.js"]
