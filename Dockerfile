FROM node:15.14.0
WORKDIR /usr/src/app
COPY package*.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn run build
RUN npm install -g serve
EXPOSE 5000
ENTRYPOINT ["serve", "-s", "build"]