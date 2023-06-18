# build stage
FROM node:18-alpine as build

WORKDIR /app

RUN addgroup --system app && adduser -S -G app app && \
    chown -R app:app /app

USER app

ARG VITE_API_URL
ARG VITE_API_TOKEN

# Copy package files to separate yarn install and copying other files
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of project files
COPY . .

# App final stage
# serving the production build
FROM node:18-alpine

WORKDIR /App

CMD ["yarn", "start"]
