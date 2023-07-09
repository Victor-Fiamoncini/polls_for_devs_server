FROM node:14.18.3-slim

WORKDIR /polls_for_devs_node

COPY ./package.json .

RUN npm cache clean --force
RUN npm i

COPY . .

EXPOSE 3333

CMD [ "npm", "run", "dev" ]
