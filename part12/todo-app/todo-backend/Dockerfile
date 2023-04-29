FROM node:16
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app/

RUN npm ci --only=production

ENV DEBUG=express:router
USER node

CMD ["dumb-init", "npm", "start"]