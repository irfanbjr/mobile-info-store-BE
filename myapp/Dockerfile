
# Use an official Node.js runtime as a parent image
FROM node:16.20-bookworm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose a port (if your Node.js application listens on a specific port)
EXPOSE 5000

# Define the command to run your application
CMD [ "node", "index.js" ]
