FROM node:4.6.2

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@3.10.9

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/books/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/books
RUN npm cache clean
RUN npm install --slient --progress=false

USER root
COPY . $HOME/books
RUN chown -R app:app $HOME/*
USER app

CMD ["npm", "start"]