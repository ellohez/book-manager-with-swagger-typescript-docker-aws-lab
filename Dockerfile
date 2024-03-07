# Utilising Docker multistage builds
# Part 1 use the node base image to produce
# the build of the application
FROM node:18.16.0
WORKDIR /app
COPY package.json .
COPY swagger.yaml .
COPY ./src ./src
RUN npm install --production
RUN npm install nodemon

# Part 2
# This build takes the built code from part 1
# And executes it to start the application
FROM node:18.16
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --from=0 --chown=node:node /app .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
