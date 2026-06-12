FROM node:22-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev \
    && npm install @rollup/rollup-linux-x64-gnu lightningcss-linux-x64-gnu --save-optional
COPY . .
RUN npx svelte-kit sync
RUN npm run build
RUN npm prune --omit=dev

FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "build"]
