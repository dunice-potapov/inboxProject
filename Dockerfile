FROM node:4.2.4

WORKDIR /home/app
ADD . /home/app

RUN npm update -g npm
RUN \
    npm install -g bower && \
    npm install --global gulp-cli && \
    npm install

EXPOSE 8000

# CMD ["npm", "start"]
CMD ["gulp", "webserver"]