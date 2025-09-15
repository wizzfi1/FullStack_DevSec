FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production --ignore-scripts
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
