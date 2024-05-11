FROM node:21-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:21-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build /app
EXPOSE 5000
CMD ["serve", "-s", "."]
