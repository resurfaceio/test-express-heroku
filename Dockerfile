FROM resurfaceio/python-node:2.3.0
WORKDIR /app
COPY . .
RUN npm install && npm install resurfaceio/logger-nodejs --save
EXPOSE 5000
CMD node index.js
