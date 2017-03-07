FROM node:6.5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install --verbose sharp
RUN npm install

CMD ["node", "index.js"]

EXPOSE 3000
