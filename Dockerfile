FROM node:18-slim

RUN apt-get update && apt-get install -y \
  chromium \
  libx11-xcb1 \
  libnss3 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxi6 \
  libxtst6 \
  libxrandr2 \
  libasound2 \
  libatk1.0-0 \
  libgtk-3-0 \
  --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
