FROM node:16

WORKDIR /client-web-app

RUN npm i -g serve

COPY ./build /client-web-app

EXPOSE 4400

CMD [ "npx", "serve", ".", "-s", "-p", "4400" ]
