FROM node:18.7.0

WORKDIR /

COPY . .

RUN npm install

CMD [ "node", "server.js"]
