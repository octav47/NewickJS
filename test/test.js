/**
 * TO DO: Add more tests!
 */
var Newick = require('../index.js');

var tree = Newick.parse('(A: 0.1,B: 0.2,(C:0.3,D:0.4)E:0.5)F;');
var assert = function (x) {
    if (x) {
        console.log('.');
    } else {
        console.log('F');
    }
};
assert(tree.name == 'F');
assert(tree.branchset.length == 3);
assert(tree.branchset[0].name == 'A');

var normalizedDataTest = {
    b: 5.2631578947368425,
    d: 21.05263157894737,
    g: 15.789473684210526,
    c: 10.526315789473685,
    e: 42.10526315789474,
    f: 5.2631578947368425
};

var normalizedData = Newick.dfs(Newick.normalize(tree));

var normalizedDataTestResult = true;
for (var i in normalizedData) {
    if (normalizedData.hasOwnProperty(i)) {
        if (normalizedData[i] - normalizedDataTest[i] > 1e-10) {
            normalizedDataTestResult = false;
            break;
        }
    }
}

assert(normalizedDataTestResult);