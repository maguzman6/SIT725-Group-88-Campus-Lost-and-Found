# Use official Node.js Alpine lightweight image
FROM node:lts-alpine3.24

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose application port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
