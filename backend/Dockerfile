#------------Build stage---------

FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .

# -----------Runtime stage--------
FROM node:18-alpine
WORKDIR /app-h
RUN addgroup -g 1000 appgroup \
 && adduser -u 1000 -S appuser -G appgroup \
 && mkdir -p /app-h/logs \
 && chown -R appuser:appgroup /app-h
 USER appuser
# creating the non-root user
# RUN addgroup -S Harigroup \
#     && adduser -S Hariuser -G Harigroup \
#     && mkdir -p /app-h/logs \
#     && chown -R Hariuser:Harigroup /app-h
# USER Hariuser
#copy built app from the builder
COPY --from=builder /app /app-h
EXPOSE 5000
CMD ["node","server.js"]