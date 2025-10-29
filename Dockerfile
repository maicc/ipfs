FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install 

COPY . . 

RUN npm run build

FROM node:18-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=build /app/dist ./dist

EXPOSE 3000

ENV NODE_ENV= production
ENV PORT=3000

CMD ["node", "dist/index.js"]