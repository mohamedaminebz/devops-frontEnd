# Stage 1: Build the React app
FROM node:18 AS build
WORKDIR /app
COPY package.json  ./
RUN npm install --force
COPY . .
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:1.21
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build the React app
