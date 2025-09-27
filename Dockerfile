# Use official Node.js Alpine image
FROM node:20-alpine

WORKDIR /app

# Install dependencies
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts

# Copy app code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001 -G appgroup
USER appuser

# Expose app port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start app
CMD ["npm", "start"]