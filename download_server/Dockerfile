FROM node:21-bookworm

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY ./ .

EXPOSE 8443

COPY server.js ./server.js

CMD ["node", "server.js"]