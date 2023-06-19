# build stage
FROM node:18-alpine as build

WORKDIR /app

RUN addgroup --system app && adduser -S -G app app && \
    chown -R app:app /app

USER app

ARG VITE_API_URL
ARG VITE_API_TOKEN

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

# Copy package files to separate yarn install and copying other files
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of project files
COPY . .

ENV NODE_ENV=production

# Build project into dist
RUN yarn run build

# This is just for debugging purposes
CMD bash

# App final stage
# serving the production build
FROM nginx:1.25.1-alpine

# We need some custom nginx configuration, which we import here
COPY nginx.default.conf /etc/nginx/conf.d/default.conf

# Copy our production build from the first step to nginx's html directory
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/ .

EXPOSE 5000
