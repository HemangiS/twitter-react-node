# twitter-react-node Front-end

twitter website built using Node.js, PostgreSQL and Express.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
  - [npm i](#npm-i)
- [Features](#features)

## Prerequisites

* [React](https://facebook.github.io/react/docs/installation.html)

## Folder Structure

After creation, your project should look like this:

```
frontend/
  public/
    css/
      style.css
    images/
      cover.jpg
      logo.png
    fevicon.ico
    index.html
  src/
    components/
      about.js
      App1.js
      App2.js
      AppRoutes.js
      editprofile.js
      followers.js
      index1.js
      login.js
      logout.js
      profile.js
      register.js
      welcome.js
      yourprofile.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
    routes.js

```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Setup

## In the frontend directory, you can run:

### `npm i`

installs dependencies

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Features

* User Login using personal mail account.
* User Self-registration form.
* User's details are stored in their profile.
* User can post their thoughts and updates using tweet feature.
* User can follow other users to share thoughts and updates.
* User can update their profile.
* User can delete their tweets.
* User can logout.
