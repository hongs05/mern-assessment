# Use the official Node.js image
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY front-end/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY front-end/ .

# Build the application
RUN npm run build

# Serve the application using a lightweight server
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 3000

# Command to run the server
CMD ["nginx", "-g", "daemon off;"]