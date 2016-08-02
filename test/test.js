/**
 * TO DO: Add more tests!
 */
var Newick = require('../index.js');

var treeString = '(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;';

var tree = Newick.parse(treeString);
var assert = function (x) {
    if (x) {
        console.log('.');
    } else {
        console.log('F');
    }
};
// init
assert(tree.name == 'F');
assert(tree.branchset.length == 3);
assert(tree.branchset[0].name == 'A');

// serialize
var serializedTree = Newick.serialize(tree);
assert(serializedTree === treeString.replace(/\s+/g, ''));

// normalize
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

// map
(function () {
    var tree = Newick.parse(treeString);

    var mappedDataTest = {
        'A mapped': 1,
        'B mapped': 2,
        'E mapped': 5,
        'C mapped': 3,
        'D mapped': 4
    };


    tree = Newick.map(tree, function (e) {
        e.length *= 10;
        e.name += ' mapped';
        return e;
    });
    var mappedDataTestResult = true;
    var treeData = Newick.dfs(tree);
    for (var i in treeData) {
        if (treeData.hasOwnProperty(i)) {
            if (treeData[i] - mappedDataTest[i] > 1e-10) {
                mappedDataTestResult = false;
                break;
            }
        }
    }
    assert(mappedDataTestResult);
})();