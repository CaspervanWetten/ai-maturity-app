# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve

EXPOSE 8082
USER node
CMD ["serve", "-s", "dist", "-l", "8082"]