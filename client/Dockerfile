FROM node:14-alpine
WORKDIR /opt/app
COPY package.json ./
RUN npm install
COPY . .
ENV NODE_ENV production
RUN npm run build
RUN npm prune --production
EXPOSE 3000
CMD ["npm", "start"]
