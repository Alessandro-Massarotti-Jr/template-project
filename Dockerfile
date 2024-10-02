FROM node:22-alpine as build
USER node
WORKDIR /home/node/app
COPY --chown=node:node ["package.json", "package-lock.json*", "./"]
COPY tsconfig.json ./tsconfig.json
COPY src/ /home/node/app/src
RUN npm install
RUN npm run build


FROM node:22-alpine
USER node
WORKDIR /home/node/app
COPY --from=build /home/node/app/build /home/node/app/src
COPY --chown=node:node ["package.json", "package-lock.json*", "./"]
RUN npm ci --omit=dev
EXPOSE 3000

CMD ["npm", "start"]
