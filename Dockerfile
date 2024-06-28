FROM node:18 AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.23-alpine
COPY --from=build /app/dist/assets /usr/share/nginx/html/assets
COPY --from=build /app/dist/index.html /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf