FROM node:20-alpine3.21  # ← Update to latest

WORKDIR /app

# Update Alpine packages for security fixes
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

COPY package*.json ./
RUN npm ci --only=production --ignore-scripts

COPY . .

# Create non-root user with high UID
RUN addgroup -g 1000 -S appgroup && adduser -S appuser -u 1000 -G appgroup
USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["npm", "start"]