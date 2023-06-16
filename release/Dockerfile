# Build stage
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

# Final stage
FROM node:18-alpine

WORKDIR /app

RUN addgroup --system app && adduser -S -G app app && \
    chown -R app:app /app

USER app

# Copy the production build from the build stage
COPY --from=build /app/dist ./dist

CMD ["yarn", "start"]
