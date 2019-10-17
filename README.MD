# Deadly Note
## Securely share passwords, credentials, and notes.

### Introduction

Deadly Note is a simple Javascript application that allows users to send and share sensitive data securely. Using **strong AES256 encryption** sharing notes is safe and secure. Even if the database is compromised, without the decryption keys the information **is useless for any attacker**. 

### Installation

#### DEV


Start the containers

```
$ make dev
```
- Then access **http://localhost:4200/**

Clean the containers

```
$ make clean-dev
```

#### PROD

This will start the application in production mode. You might want to tweak the `vhost` file in `./docker/nginx/vhost.conf` to suit your needs.

```
$ make prod
```
- Then access **http://localhost:4200/**

Clean the containers

```
$ make clean-prod
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
 