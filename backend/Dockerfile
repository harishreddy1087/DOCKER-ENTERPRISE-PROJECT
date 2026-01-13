#------------Build stage---------

FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .

# -----------Runtime stage--------
FROM node:18-alpine
WORKDIR /app-h
# creating the non-root user
RUN addgroup -g 1000 Harigroup \
    && adduser -u 1000 -S Hariuser -G Harigroup \
    && chown -R Hariuser:Harigroup /app-h
USER Hariuser
#copy built app from the builder
COPY --from=builder /app /app-h
EXPOSE 5000
CMD ["node","server.js"]