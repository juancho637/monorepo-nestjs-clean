# Etapa 1: Builder
FROM node:22-alpine AS builder
WORKDIR /app

# Copia los archivos necesarios de la raíz del monorepo
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Copia todo el código (se asume que el contexto de build es la raíz)
COPY . .

# Compila únicamente el micro gateway-service
RUN npx nest build gateway-service

# Etapa 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app

# Copia la compilación del gateway-service
COPY --from=builder /app/dist/apps/gateway-service ./dist/apps/gateway-service
COPY --from=builder /app/package*.json ./

# Instala únicamente las dependencias de producción
RUN npm ci --only=production

EXPOSE 3000
CMD ["node", "dist/apps/gateway-service/main"]
