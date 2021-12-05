# Welcome to the Project

Implemented the project on Node, Express,and MongoDB platform.

Initially I thought of using the tech stack Python(Flask) with MySQL but due to some glitches in my laptop I couldn't. I used the Node, Express and MongoDB.
This project is scalable and implemented the services with the microservices architecture. 

Here are the steps to run the application locally.

1. clone the repo and get into project directory
2. run command --> npm install <-- to install all the project dependencies
3. run command --> npm start <-- to run the application
4. Application will start running at localhost:4000

# These are the steps to test the API's

1. localhost:4000/api/videos : this API call the Youtube Data API v3 to fetch the data and stores it in DB. Also this API run continously in the background to fetch the data from youtube API and stores in a DB
2. localhost:4000/api/videos/data?page=1&limit=5 : this API returns the stored data from the DB in a descending order with certain queries like pagination and limit to show the data per page
3. localhost:4000/api/videos/search/params : this is the last API which takes care of search with multiple fields like title and description. I implemented with regex to make it more reliable and optimized. type any letter which are in title or description. it will give you the result.

# Dockerizing the Express application

Below are the steps to dockerize the application and deploying to Kubernetes cluster

1. This Dockerfile uses npm to install modules in our RESTful application.
2. Setup YAML service file to deploy Dockerized
3. In the root directory, created file called deployment.yaml. This file will deploy the application to the Kubernetes engine.
4. deployment file has two parts
   1. Service - The service acts as the load balancer. A load balancer is used to distribute requests to the various available servers.
   2. Deployment will act as the intended application. The user request hits the load balancer, then the load balancer distributes the request by creating the number of replicas defined in the deployment.yaml file. For example, in our case, we have five replicas for scalability, meaning that we will have 5 instances running at a time.
