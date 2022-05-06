FROM node:16-alpine
WORKDIR /usr/src/app

ENV TZ Asia/Tokyo
ENV NODE_ENV production

COPY package*.json ./
RUN npm set-script prepare ""
RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "start"]
