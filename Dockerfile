FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better cache management)
COPY package*.json ./

# Install the dependencies
RUN rm -rf node_modules package-lock.json

RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Set the default command to run the app
CMD ["npm", "start"]
