FROM node:22-alpine

# Install the OpenSSL shared libraries required by Prisma inside Alpine container pods
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

RUN npx prisma generate

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
