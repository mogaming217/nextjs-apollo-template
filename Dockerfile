FROM node:14-alpine
WORKDIR /usr/src/app
COPY . .

ENV TZ Asia/Tokyo
ENV NODE_ENV production

RUN npm install

EXPOSE 80

CMD ["npm", "run", "start"]
