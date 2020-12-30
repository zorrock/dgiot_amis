FROM 172.18.1.1:15000/node:12.20.0-alpine3.12 as dev
ADD ./server /app
ADD ./dist /
WORKDIR /app
ENTRYPOINT ["node", "server.js", "--port", "9066"]
EXPOSE 9066
