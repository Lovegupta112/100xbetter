FROM node:23-alpine

WORKDIR /app

COPY package.* .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm","start" ]