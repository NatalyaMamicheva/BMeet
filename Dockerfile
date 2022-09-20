FROM node:16.16.0
WORKDIR /app
COPY my-app/package.json /app/package.json
RUN npm install
COPY ./my-app /app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
