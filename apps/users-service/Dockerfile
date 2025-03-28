# Etapa 1: Builder
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY . .

RUN npx nest build users-service

# Etapa 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist/apps/users-service ./dist/apps/users-service
COPY --from=builder /app/package*.json ./

RUN npm ci --only=production

EXPOSE 3000
CMD ["node", "dist/apps/users-service/main"]
