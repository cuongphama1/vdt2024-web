# Use an official Node.js runtime as a parent image
FROM node:lts-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install http-server globally
RUN npm install -g http-server

# Expose the port http-server will run on
EXPOSE 8080

# Run http-server to serve the web content
CMD ["http-server", "-c-1", "public/"]
