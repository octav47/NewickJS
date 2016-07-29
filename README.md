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

var tree = newick.parse('(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F')
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

var vertex = newick.dfs(tree); // tree is a string or object
/*
 * returns vertex data
 * {
 *   A: 0.1,
 *   B: 0.2,
 *   C: 0.3,
 *   D: 0.4,
 *   E: 0.5
 * }
 *
*/

var tree2 = '(A:25,B:100)F';
var normalizedTree = newick.normalize(;
/*
 * returns object
  * {
  *   name: "F",
  *   branchset: [
  *     {name: "A", length: 0.2},
  *     {name: "B", length: 0.8}
  *   ]
  * }
 *
*/
```

> Look at inline docs in source for more information

## TODO:
* Newick.dfs: more tests