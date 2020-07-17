# ---------- BUild -------------
FROM node:lts as build-stage

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY ./ /app

RUN npm run build

# ---------- Production -------------
FROM nginx

WORKDIR /nginx/html

COPY ./nginx.conf /etc/nginx
COPY --from=build-stage /app/dist /nginx/html

RUN nginx -t

EXPOSE 80