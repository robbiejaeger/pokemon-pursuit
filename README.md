# Pokemon Pursuit

All of the steps are completed except for ensuring step #5, noted below.

## My Process

1. Read through take home specification.
1. Wireframe rough layout.
1. Test out API with Postman.
1. Begin with Create React App template with TS.
1. GET pokemon via search input into state (I could fetch all pokemon at once and then the input would be a filter on all data, but I wanted to assume that the data in a Temporal application would be too large to fetch all of it at the beginning).
1. Initially added each set of results from the network requests to state as they came in, one-by-one, but timing complexity was large - transitioned to getting all results from each set of network requests and then display them all to the page at once.
1. Added display of the app's state (loading, error, etc.) with error handling.

**Known Bug:** Related to step #5 in the take home specification. If you type in the search input relatively slowly, then the data that is presented is the most recent search query. However, If you type quickly, the results could be stale. I would want to implement something like `AbortController` to stop the old network request(s) and/or implement logic to compare the current search input value to the data being put into state. The debouncing extension might fix this, but I wouldn't want to rely on the debouncing feature to ensure accurate results.

## Next Steps

1. Implement logic to make sure that typing quickly will not result in stale data being displayed (step #5).
1. Create Cypress tests with network intercepts for happy and sad paths.
1. DRY up error handling in the try/catch blocks.

## Set Up

1. Clone down the repo and change into the cloned directory.
1. Run `npm install` to install dependencies.
1. Run `npm start` to start the application.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
