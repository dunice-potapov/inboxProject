FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install --global bower
RUN npm install

COPY bower.json /usr/src/app/
COPY .bowerrc /usr/src/app/
RUN bower install --allow-root

# Bundle app source
COPY . /usr/src/app

EXPOSE 5000
CMD [ "npm", "start" ]