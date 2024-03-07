# Activity 1

## 🗺 Exploration

## 🔎 Exercise 1.1 - Exploring the Code

If you have previously created a JavaScript Express API then most of the files should look familiar.

However, there is one new file to point out and that is the [Dockerfile](../Dockerfile).

The Dockerfile looks like this:

```dockerfile
# Utilising Docker multistage builds
# Part 1 use the node base image to produce
# the build of the application
FROM node:18.16.0
WORKDIR /app
COPY package.json .
COPY swagger.yaml .
COPY ./src ./src
RUN npm install --production

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
```

- What do you think might be happening in the first line of that Dockerfile?

<details>
<summary>Click here to see the answer</summary>
<pre>

Think of Docker [images](https://docs.docker.com/glossary/#image) like layers of an onion.

We can create Docker images that build upon previous layers.

The first line of this particular Dockerfile tells Docker build
on a Node image provided on the [DockerHub](https://hub.docker.com/_/node) by NodeJS.

That particular image makes sure the version 18.16 of  
Node is present.

</pre>
</details>

Wait....hold up....in the answer you mentioned the [Docker Hub](https://hub.docker.com). What is the Docker Hub?!

The Docker hub is a public site where you can publish Docker images. You can make them publicly available for the community to use.

Very similar to the Node dependencies you've got in your code. Those Node dependencies get pulled from the [npmjs.com][https://npmjs.com] servers.

Well in Docker that image (`node:18.16`) we've "based" our Dockerfile from, gets "pulled" from the Docker Hub.

In container talk, the Docker Hub is known as a **Container Registry** but more on that later...

Moving on to the following few lines:

```dockerfile
WORKDIR /app
COPY package.json .
COPY swagger.yaml .
COPY ./src ./src
```

Well those lines run instructions within the container image. They copy firstly set up the "working directory" within the container. Essentially telling the container that all files will be copied to a directory call **/app**

Then you copy files from your local machine, package.json, swagger.yaml and the src directory into the container image.

Before moving on to installing the dependencies (as defined in the package.json):

```dockerfile
RUN npm install --production
RUN npm install nodemon
```

Once the dependencies are installed notice that there is a second stage where we seem to define another base image.

This two phase approach is a concept in Docker called ["multi-stage builds"](https://docs.docker.com/develop/develop-images/multistage-build/).

It allows us to use both Docker to build the application and then also to run it. Essentially if you didn't have node installed locally but you did have docker then you could still build and run the application.

Part 2 of the dockerfile is for running the application

```dockerfile
FROM node:18.16
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --from=0 --chown=node:node /app .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
```

Firstly we use define our base image again:

```dockerfile
FROM node:18.16
```

Then we make sure that any subsequent commands are executed using the **node** user. This is a security enhancement. By default docker commands are run as "root" unless explicitly told otherwise. If we ran the application as root then we could be exposing ourselves to a user gaining root access to the container. So we use the `USER` docker command to specify that we are using the **node** user for all subsequent commands:

```dockerfile
USER node
```

The next 3 lines create a new directory, then setup the `WORKDIR` command to essentially say this is the directory I want to change to for all subsequent commands before finally doing the smart part which is to take the code produced by the first part of the multi-stage build and copy it into this container:

```dockerfile
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --from=0 --chown=node:node /app .
```

Finally we define which port the application will expose before starting the application. In our case we'll expose port 3000.

```dockerfile
EXPOSE 3000
```

Then the final line is the powerful one. An `ENTRYPOINT` instruction tells Docker what command should be executed when starting the container.

```dockerfile
ENTRYPOINT ["npm", "start"]
```

Essentially this says, when the docker container runs please run the command `npm start`. Just like you might do on your local computer.

Now we've had a bit of an explore, I expect you're excited to get building a docker image and getting it running.

===

Head over to [Activity 2](./activity_2.md) and we can get things built and running.
