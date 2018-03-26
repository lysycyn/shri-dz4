FROM node:8

ADD ./ /opt/shri-dz4
WORKDIR /opt/shri-dz4

RUN tar -xvf test-repo.tar
RUN npm i --production

CMD npm start

EXPOSE 3000
