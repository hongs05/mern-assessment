# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY back-end/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY back-end/ .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]