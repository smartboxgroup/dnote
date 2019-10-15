# Deadly Note
## Securely share passwords, credentials, and notes.

### Introduction

Deadly Note is a simple Javascript application that allows users to send and share sensitive data securely. Using **strong AES256 encryption** sharing notes is safe and secure. Even if the database is compromised, without the decryption keys the information **is useless for any attacker**. 

### Installation

First install dependencies for both services:

```
$ cd backend
$ npm install
$ cd ../frontend
$ npm install
```

Then create a custom network:

```
$ docker network create deadlynote_proxy
```

Finally **start the containers** and then open http://localhost:4201/

```
$ docker-compose -f docker-compose.yml -f docker-compose.production.yml up
```

This will start the application in production mode. You might want to tweak the `vhost` file in `./docker/nginx/vhost.conf` to suit your needs.

If you want to start the application in development mode, just run the following command and open http://localhost:4201/

```
$ docker-compose up
```

### Usage

Type your note in the textbox and then click "Generate". The text will be replace **with a link to the note**.

URLs are composed of the _unique note identifier_ + _decryption password_.

```
https://dnote.local/57a7f1#63fb7eb46549bf363e9b9a9666636698
========^^^^^^^^^^^=^^^^^^=^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
           domain     ID       decryption password
```

Once a note is retrieved, **it gets deleted** from the database.

### Tech stack

 * **Frontend**: Vue.js
 * **Backend**: Node
 * **Database**: Redis
 