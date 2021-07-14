FROM node:alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "start"]