# Dockerizing the Express application

Below are the steps to dockerize the application and deploying to Kubernetes cluster

1. This Dockerfile uses npm to install modules in our RESTful application.
2. Setup YAML service file to deploy Dockerized
3. In the root directory, created file called deployment.yaml. This file will deploy the application to the Kubernetes engine.
4. In the deployment file, it has two parts
   1. Service - The service acts as the load balancer. A load balancer is used to distribute requests to the various available servers.
   2. Deployment will act as the intended application. The user request hits the load balancer, then the load balancer distributes the request by creating the number of replicas defined in the deployment.yaml file. For example, in our case, we have five replicas for scalability, meaning that we will have 5 instances running at a time.
