# syntax=docker/dockerfile:1
FROM node:18.14.2-alpine3.17 as builder
ARG GITHUB_TOKEN
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN npm install -g pnpm
COPY ["package.json", "pnpm-lock.yaml", ".npmrc", "./"]
COPY ["tsconfig*.json", "."]
USER node
RUN pnpm install && rm -f .npmrc
COPY --chown=node:node . .
RUN pnpm build

FROM node:18.14.2-alpine3.17
# ARG MONGODB_URI
# ENV MONGODB_URI=$MONGODB_URI
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN mkdir /home/node/app/certs
WORKDIR /home/node/app
COPY --from=builder --chown=node:node /home/node/app/dist ./
COPY --from=builder --chown=node:node /home/node/app/config ./config
COPY --from=builder --chown=node:node /home/node/app/node_modules ./node_modules
COPY ["./certs", "./certs"]
COPY ["src/api-docs", "./api-docs"]
USER node
EXPOSE 3001
CMD ["node", "main.js"]