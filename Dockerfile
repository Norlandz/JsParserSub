FROM node@sha256:c325fe5059c504933948ae6483f3402f136b96492dff640ced5dfa1f72a51716

WORKDIR /usr/local/diskUsing/wsp/currApp
COPY . .

RUN npm install -g pnpm@8.10.2
RUN pnpm install

EXPOSE 3000
CMD ["pnpm", "run", "dev"]
