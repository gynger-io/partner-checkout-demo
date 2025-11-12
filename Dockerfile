FROM node:24-alpine

# Create app directory
WORKDIR /usr/app

# Copy package files
COPY package.json ./
COPY package-lock.json ./

# Install ALL dependencies (needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove devDependencies to reduce image size
RUN npm prune --production

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

CMD ["node", "index.js"]