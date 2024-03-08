FROM node:18.18.2-alpine
RUN apk add --no-cache python3 g++ make build-base gcc
 
RUN npm install -g node-gyp
RUN npm install -g @vkontakte/vk-tunnel --include=dev
 
WORKDIR /app