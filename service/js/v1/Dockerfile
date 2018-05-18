FROM node:9-alpine
LABEL maintainer="will835559313@163.com"
COPY . /app
WORKDIR /app
RUN npm i && npm run build \
    && rm -rf ./node_modules \
    && npm install http-server -g
EXPOSE 80
CMD ["http-server", "-p", "80"]