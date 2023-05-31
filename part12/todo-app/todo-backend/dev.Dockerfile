FROM node:16
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app/

RUN npm install

USER node

CMD ["dumb-init", "npm", "run", "dev"]