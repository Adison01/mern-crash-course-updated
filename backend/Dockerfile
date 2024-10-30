FROM node:slim
RUN npm install -g nodemon
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 5000
CMD [ "npm", "run", "start" ]

