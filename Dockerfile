FROM node:14.9
WORKDIR /core
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install
RUN npm run build