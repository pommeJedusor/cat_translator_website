FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./index.* /usr/share/nginx/html/
COPY ./night-background.png /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
