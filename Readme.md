Single dependency to add tests to a [ButterProvider](https://github.com/butterproviders/butter-provider)
====

to use simply:
```sh
$ npm i butter-test-provider
```

or if you're from the new kids:
```sh
$ yarn add butter-test-provider
```

this should modify your `package.json` file to include:
```js
  "scripts": {
    "test": "mocha ./node_modules/butter-provider/tests/*",
    "lint": "eslint tests/** index.js"
  },
```
