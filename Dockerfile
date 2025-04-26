# Fetching the latest node image on alpine linux
FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 3000

CMD [ "pnpm", "dev-host" ]