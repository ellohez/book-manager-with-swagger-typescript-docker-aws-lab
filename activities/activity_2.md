# Activity 2

## 🛠 Building and Running

## 💿 Exercise 2.1 - Installing Docker

In order to build and run Docker containers we'll need to install Docker.

Thankfully Docker provide installers for various operating systems.

Head over to their website and install **Docker Desktop** on to your computer.

**NOTE:** You DO NOT have to pay or sign up for any paid subscription to complete this lab.

https://www.docker.com/get-started

## 💻 Exercise 2.2 - Validating installation

Once you have successfully installed Docker Desktop you should be able to run various docker commands from the terminal

Have a go now and see if you can see your docker version by running the `docker --version` command.

You should see something similar to:

```
docker --version

Docker version 20.10.11, build dea9396
```

## 🎨 Exercise 2.3 - Reviewing images

Let's have a look at the docker images you have on your computer.

```
docker images
```

If you don't have any images yet, you'll see something like this:

```
docker images

REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```

## 🧰 Exercise 2.4 - Building your image

Now the exciting part, let's build your first docker image.

Make sure you are in the root of your project (essentially where the **Dockerfile** is located) and run the following command:

```
docker build -t book-manager-api:1.0 .
```

You should see Docker start to build your image. It might take a few minutes whilst it pulls down (downloads) the base images required.

Now try the `docker images` command again. Let's see if the image is there. You should see something similar to:

```
docker images

REPOSITORY         TAG       IMAGE ID       CREATED             SIZE
book-manager-api   1.0       37b00ee85718   About an hour ago   245MB
```

## 🧰 Exercise 2.5 - Running your container

🙈 Ok so maybe this is the exciting part. Now that your Docker image is built, we can run it.

The docker tool allows you to build containers and also run them.

To run your docker container, run the following command:

**NOTE:** If you changed the **book-manager-api:1.0** part of the build command (step 2.5) then you'll need to update the command below:

```
docker run -p 3000:3000 --env-file ./.env book-manager-api:1.0
```

All being well it should start up your API running as a Docker container.

- See if you can find out what the `-p 3000:3000` part of that command is doing?

<details>
<summary>Click here to see the answer</summary>
<pre>

The **-p** part of the command stands for **publish** a container's ports.

Essentially this says forward ALL requests made on your computer to port 3000 on to port 3000 within the container.

</pre>
</details>

## 🎉 Exercise 2.6 - Accessing your application

With the container still running, open up your browser and go to:

[http://localhost:3000/api/v1/books](http://localhost:3000/api/v1/books)

You should see your application respond with the JSON for the two Books which are in the seed data for the API.

You can also see some corresponding Swagger documentation

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 🛑 Exercise 2.7 - Stopping the container

We can now stop the container.

To stop your container, open up another terminal and run:

```
docker ps
```

You should see something similar to the following:

```
CONTAINER ID   IMAGE                  COMMAND       CREATED              STATUS              PORTS                    NAMES
64fe372708bf   book-manager-api:1.0   "npm start"   About a minute ago   Up About a minute   0.0.0.0:3000->3000/tcp   compassionate_lederberg
```

Make a note of that container ID and run the following command (replacing CONTAINER_ID with the actual container ID)

```
docker stop CONTAINER_ID
```

or you can do `kill` to forcefully stop the application.

```
docker kill CONTAINER_ID
```

===

Head over to [Activity 3](./activity_3.md) and we look into deploying your container.
