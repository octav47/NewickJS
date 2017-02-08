<img src="http://tribunsky.com/img/newick_logo.png" width="256">

# NewickJS

> JavaScript library for parsing the Newick format.

> About Newick format @ wikipedia: http://en.wikipedia.org/wiki/Newick_format


## Documentation

[Github Wiki](https://github.com/octav47/NewickJS/wiki)

## Install

```
$ npm install newick

or in browser

<script src="newick.min.js"></script>
```


## Usage (nodejs):

```js
var Newick = require('newick');
var newick = new Newick('some data');
```

## Usage (browser):

```js
var newick = new Newick('some data');
```

## TODO:
* Newick.dfs: more tests