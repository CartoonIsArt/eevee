FROM node:15.14.0
WORKDIR /usr/src/app
COPY . .
RUN yarn install
CMD yarn run start