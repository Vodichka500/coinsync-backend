# Use Node.js 20.11.1 base image
FROM node:20.11.1-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Generate Prisma Client code
RUN npx prisma generate

# Сборка TypeScript в папку dist
RUN npm run build

# Expose the port the app runs on, here, I was using port 3333
EXPOSE 4012

# Command to run the app
CMD [  "npm", "run", "start:migrate:prod" ]