FROM openresty/openresty:1.13.6.1-2-alpine
LABEL maintainer="will835559313@163.com"
COPY . /app
WORKDIR /app
EXPOSE 80
CMD ["nginx", "-c", "nginx.conf", "-g", "daemon off;"]