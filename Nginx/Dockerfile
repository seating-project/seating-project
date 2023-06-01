FROM nginx:stable-alpine

# RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY /include.websocket /etc/nginx/app/include.websocket
COPY /include.forwarded /etc/nginx/app/include.forwarded
COPY /nginx.conf /etc/nginx/conf.d

# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]