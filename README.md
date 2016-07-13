# Newick parser

> JavaScript library for parsing the Newick format.

> About Newick format @ wikipedia: http://en.wikipedia.org/wiki/Newick_format


## Install

```
$ npm install newick
```


## Usage:

```
var newick = require('newick');

newick.parse('(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F')
/*
 * returns object
 * {
 *   name: "F",
 *   branchset: [
 *     {name: "A", length: 0.1},
 *     {name: "B", length: 0.2},
 *     {
 *       name: "E",
 *       length: 0.5,
 *       branchset: [
 *         {name: "C", length: 0.3},
 *         {name: "D", length: 0.4}
 *       ]
 *     }
 *   ]
 * }
 *
*/
```

> Look at inline docs on github for interesting moments

## TODO:
* Newick.dfs: tests
* Newick.normalize