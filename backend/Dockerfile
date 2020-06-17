FROM node:lts

WORKDIR /home/app
COPY . .

RUN npm i
RUN npm i --only=dev

CMD ["npm","run","watch"]