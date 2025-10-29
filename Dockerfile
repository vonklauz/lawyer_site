# --- 1. Установка зависимостей (включая dev) ---
FROM node:20-alpine AS deps
WORKDIR /app

# Копируем только package.json и lockfile для кэширования
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# --- 2. Сборка приложения ---
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем node_modules из предыдущего stage
COPY --from=deps /app/node_modules ./node_modules

# Копируем исходники проекта
COPY . .

# Собираем Next.js приложение
RUN npm run build

# --- 3. Продакшн-окружение ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Копируем только нужное для запуска
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Next.js рекомендует запускать именно так
CMD ["npm", "run", "start"]
