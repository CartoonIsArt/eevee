FROM node:15.14.0
COPY . .
RUN yarn install
ENTRYPOINT [ "yarn" "start" ]