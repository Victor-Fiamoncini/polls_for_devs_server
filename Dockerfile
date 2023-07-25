FROM node:14.18.3-slim

WORKDIR /home/polls_for_devs_node

COPY ./package.json .

RUN npm cache clean --force
RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]
