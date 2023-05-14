FROM node:16-bullseye AS build-stage
LABEL authors="Andrei Neagu"

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://andrei-ThinkPad-T480:3000

RUN npm ci

RUN npm run build

FROM build-stage as test

WORKDIR /usr/src/app

RUN npm run test

FROM nginx:stable-alpine3.17-slim

ENV REACT_APP_BACKEND_URL=http://andrei-ThinkPad-T480:3000

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html