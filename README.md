## Getting started

Install packages

```
npm i
```

Run front (required)
```
npm start
```

Run third party API (required)
```
npm run start-api
```

Run test
```
npm test
```

JSDOC is in the root project

DEMO & FEATURES
```
- You can see a chart representing the value of stocks
- You can update the stock value in the table and see instantly the result on the chart
- When you leave the input (onBlur) you will save the data in "fake" database(json-server). A confirmation toaster will appear
- When the third party is not responding this will cause an error and a toaster will appear
- Each time you come back to the app without any change, the cache will give you the result, we won't call the API
- When you change the value of a stock the cache will be clear
```

TECHNICAL FEATURES
```
- Implement ES6 syntax
- Implement test environnement with Jest and Enzyme
- Implement JSDoc to generate the doc
- Handle 404, 500, 403 errors with node Router
- Add bootstrap css
- Add d3js library
- Add Anti-corruption layer with axios
- Handle back error when not responding
- Add Cache on get requests
- Add toaster for IHM messages
