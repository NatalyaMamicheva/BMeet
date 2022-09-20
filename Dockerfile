# build stage
FROM node:16.16.0 as build-stage
WORKDIR /app
COPY my-app/package*.json ./
RUN npm install
COPY my-app/ .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY /nginx/frontend.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]