FROM node:18.12.1

WORKDIR /app

COPY yarn.lock package.json ./
RUN yarn install

COPY . .
RUN yarn build

CMD yarn start
