FROM node:latest

COPY package.json .
RUN npm install

WORKDIR /app
COPY ./src .

CMD node index.js