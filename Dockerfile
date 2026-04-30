# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:22-alpine AS runtime
RUN apk add --no-cache nginx

WORKDIR /app

# Copy production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy tsx for running the server without a build step
COPY --from=build /app/node_modules/.bin/tsx /app/node_modules/.bin/tsx
COPY --from=build /app/node_modules/tsx /app/node_modules/tsx

COPY server ./server
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD nginx && node /app/node_modules/.bin/tsx server/index.ts
