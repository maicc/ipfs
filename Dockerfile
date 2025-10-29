FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci
COPY . . 

RUN npm run build

FROM node:18-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "dist/server.js"]