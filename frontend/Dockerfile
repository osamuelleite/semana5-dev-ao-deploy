FROM node:20-alpine

# Bind mounts no Docker Desktop (Windows/Mac) nao propagam eventos de
# filesystem para o watcher nativo do Turbopack. O webpack dev server
# respeita watchOptions.pollIntervalMs (next.config.mjs), entao usamos
# ele apenas dentro do container para manter o hot reload confiavel.
ENV WATCHPACK_POLLING=true

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "next", "dev", "--webpack"]
