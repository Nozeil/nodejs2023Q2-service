FROM node:18-alpine

ENV PORT=4000

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "start" ]