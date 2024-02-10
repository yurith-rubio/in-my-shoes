FROM ubi8/nodejs-18:latest
USER root

WORKDIR /
RUN mkdir -p /db
ADD dist dist
ADD server server

WORKDIR /server
RUN npm install

ENTRYPOINT ["npm", "start"]
