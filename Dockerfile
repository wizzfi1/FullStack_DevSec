FROM node:20-alpine

WORKDIR /app

RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

COPY package*.json ./
RUN npm ci --only=production --ignore-scripts

COPY . .

RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001 -G appgroup
USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["npm", "start"]