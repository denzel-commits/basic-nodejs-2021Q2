ARG PORT=4000
FROM node:14.17-alpine3.13
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE $PORT
CMD [ "npm", "start" ]
