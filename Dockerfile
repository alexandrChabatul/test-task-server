FROM node:lts-alpine

WORKDIR /test-task-server
COPY package.json .
RUN npm install
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD [ "node", "dist/index.js" ]