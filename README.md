# Pokemon Pursuit

## Process

1. Read through take home specification.
1. Wireframe rough layout.
1. Test out API with Postman.
1. Begin with Create React App template with TS.
1. GET pokemon from search input into state (could fetch all pokemon at once, but want to assume that data would be too large to fetch all data and need to use the search endpoint).
1. Initially added each set of results from the network requests to state as they came in, but timing complexity was large - transitioned to getting all results form the network requests and then display them all to the page at once.
1. Added display of the app's state (loading, error, etc.)

## Set Up

1. Clone down the repo and change into the cloned directory
1. Run `npm install` to install dependencies
1. Run `npm start` to start the application

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
