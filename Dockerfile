FROM node:alpine
RUN mkdir /var/app
COPY ./ /var/app
WORKDIR /var/app
RUN adduser --disabled-password --uid 1002 apprunner
RUN chown -R apprunner .
USER apprunner
RUN npm install
CMD node bot-server.js