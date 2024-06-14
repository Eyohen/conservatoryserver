# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Install curl
RUN apk --no-cache add curl

# Install npm
RUN npm install i npm@latest -g

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

RUN curl -v https://registry.npmjs.com/ 

# Install app dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the TypeScript files
# RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]