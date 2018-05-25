FROM openresty/openresty:1.9.15.1-alpine
LABEL maintainer="will835559313@163.com"
COPY . /app
WORKDIR /app
EXPOSE 80
ENTRYPOINT ["/usr/local/openresty/nginx/sbin/nginx", "-c", "/app/nginx.conf", "-g", "daemon off;"]