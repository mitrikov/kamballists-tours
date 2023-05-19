FROM node:19-alpine3.16 as build-deps
WORKDIR /
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.3
COPY --from=build-deps /dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8888
