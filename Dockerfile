FROM node:20.9.0-slim

WORKDIR /usr/local/diskUsing/wsp/currApp
COPY . .

RUN npm install -g pnpm@8.10.2
RUN pnpm install

EXPOSE 3000
CMD ["pnpm", "start"]
