FROM node:14-alpine
WORKDIR /opt/app
COPY package*.json ./
RUN npm install --no-optional
COPY . .
RUN npm run build
