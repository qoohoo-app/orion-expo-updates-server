FROM node:16-alpine
RUN apk update && apk add --no-cache tzdata
RUN mkdir -p /home/node/server && chown -R node:node /home/node/server

# Create the directories on the docker volume
RUN mkdir -p /data/updates
RUN mkdir -p /data/uploads

# Symlink volume to directories
RUN ln -s /data/updates /home/node/server/updates
RUN ln -s /data/uploads /home/node/server/uploads

WORKDIR /home/node/server
USER node
COPY --chown=node:node package.json yarn.lock ./

RUN yarn install
RUN yarn cache clean

COPY --chown=node:node . .

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD node src/modules/docker/healthcheck.js

CMD ["node", "src/index.js"]
