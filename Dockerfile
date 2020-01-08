FROM node:12

WORKDIR /app

COPY package.json /app

RUN npm install -g pm2 yarn

RUN npm config set scripts-prepend-node-path true

RUN yarn

COPY . /app

ENV NODE_ENV production

RUN yarn buildProd

CMD [ "pm2-runtime", "build/index.js", "--", "--node-args=\"--max_old_space_size=460 --optimize_for_size --gc_interval=100\""]
