FROM node:latest
WORKDIR /app
COPY . .
RUN npm install && npm install resurfaceio/logger-nodejs --save
EXPOSE 5000
