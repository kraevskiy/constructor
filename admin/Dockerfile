FROM node:14-alpine
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production
RUN npm install -g serve
