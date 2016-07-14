/**
 * TO DO: Add more tests!
 */
var newick= require('../index.js');

var x = newick.parse('(A: 0.1,B: 0.2,(C:0.3,D:0.4)E:0.5)F;');
var assert = function(x) {
  if (x) {
    console.log('.');
  } else {
    console.log('F');
  }
};
assert(x.name == 'F');
assert(x.branchset.length == 3);
assert(x.branchset[0].name == 'A');
console.log('\n');