FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . /app
ENV NODE_OPTIONS="--trace-warnings"
EXPOSE 5000
CMD [ "npm", "run", "dev" ]