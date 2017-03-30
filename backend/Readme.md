# twitter-react-node Back-end

twitter website built using Node.js, PostgreSQL and Express.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
  - [npm i](#npm-i)
  - [node app](#node-app)
- [Features](#features)

## Prerequisites

* [Node.js >= 4.3.x/NPM](http://nodejs.org/download/)
* [PostgreSQL](http://www.postgresql.org/download/)
* [React](https://facebook.github.io/react/docs/installation.html)

## Folder Structure

After creation, your project should look like this:

```
backend/
  helpers/
    db.js
  public/
    css/
      style.css
    images/
      cover.jpg
    js/
      twitter.js
  routes/
    index.js
  test/
    index.js
  views/
  app.js
  example.env
  script.sql
  scripttest.sql
  package.json
  Readme.md

```

## Prerequisites

* [Node.js >= 4.3.x/NPM](http://nodejs.org/download/)
* [PostgreSQL](http://www.postgresql.org/download/)

## Setup

## In the backend directory, you can run:

### `npm i`

installs dependencies

### `node app`

Runs the app in the development mode on port 8000.<br>


## Features

* User Login using personal mail account.
* User Self-registration form.
* User's details are stored in their profile.
* User can post their thoughts and updates using tweet feature.
* User can follow other users to share thoughts and updates.
* User can update their profile.
* User can delete their tweets.
* User can logout.
