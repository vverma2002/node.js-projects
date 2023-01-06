#latest LTS (long term support) version 8 of node
#FROM node:8

FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies (slit in 2 steps,
# so the build can be skipped till step 14 if there is a change in .)
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
# Bundle app source
COPY . .

EXPOSE 8080
#CMD [ "npm", "start" ]
CMD [ "node", "server.js" ]