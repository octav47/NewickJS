<img src="http://tribunsky.com/img/newick_logo.png" width="256">

# NewickJS

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

var normalizedTree = newick.normalize(Newick.parse('(A:5,B:20)F;')); // tree is a string or object
/*
 * returns object
 * {
 *   name:"F",
 *   branchset: [
 *     {name:"A", length: 0.2},
 *     {name:"B", length: 0.8}
 *   ]
 * }
 *
*/

// Iterate the nodes!
var mappedTree = Newick.map(tree, function (e) {
  e.length *= 10;
  e.name += ' mapped';
  return e;
});
/*
 * returns object
 * {
 *   name: "F mapped",
 *   branchset: [
 *     {name: "A mapped", length: 1},
 *     {name: "B mapped", length: 2},
 *     {
 *       name: "E mapped",
 *       length: 5,
 *       branchset: [
 *         {name: "C mapped", length: 3},
 *         {name: "D mapped", length: 4}
 *       ]
 *     }
 *   ]
 * }
 *
*/

var serializedTree = newick.serialize(tree);
/*
 * returns string
 * '(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;'
 *
*/
```

> Look at inline docs in source for more information

## TODO:
* Newick.dfs: more tests