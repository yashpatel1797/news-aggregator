# Use Node.js as base image
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code files
COPY . .

# Pass build-time environment variables
ARG VITE_NEWS_API_KEY
ARG VITE_GUARDIAN_API_KEY
ARG VITE_NYTIMES_API_KEY

# Set environment variables
ENV VITE_NEWS_API_KEY=$VITE_NEWS_API_KEY
ENV VITE_GUARDIAN_API_KEY=$VITE_GUARDIAN_API_KEY
ENV VITE_NYTIMES_API_KEY=$VITE_NYTIMES_API_KEY

# Build the application
RUN npm run build

# Use Nginx to serve the application
FROM nginx:alpine

# Copy the build output to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]