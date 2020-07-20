FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

FROM nginx
COPY --from=0 /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d