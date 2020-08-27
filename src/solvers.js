/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*
Make a decision tree
Each node has a value, which is the matrix
For each potential child, check if it has any conflicts before adding
Recursively add children by toggling on spaces in latter half of matrix
Grab all the children at the bottom
*/
window._Tree = function(arr) {
  this.board = arr;
  this.children = [];
};

window._solutionHelper = function(n, isQueens) {
  // make top of the tree
  var solutionTree = new window._Tree(new Array(n * n).fill(0));
  // check isQueens to determine if we check diagonals too
  var addChildren = function(tree) {
    // looks at tree.board and searches for indexOf the last occurring 1
    var idx = tree.board.lastIndexOf(1) === -1 ? 0 : (tree.board.lastIndexOf(1) + 1);
    // if idx is n^2 - 1, return tree
    if (idx === (n * n - 1)) {
      return tree;
    } else {
      // for loop (i = idx; i < n^2; i++)
      //   childBoard = tree.board.slice(), childBoard[i] changed from 0 to 1
      //   check childBoard for conflicts, change back to matrix for checks, then re-flatten
      //   childBoard = addChildren(childBoard);
      //   tree.children.push(childBoard);

      // generate n^2-(n-1) new matrices that have one place toggled on
      // check these matrices, then add to tree.children
      // call addChildren to each of tree.children
    }

  };
  solutionTree = addChildren(solutionTree);
  // var solutions = do something to solutionTree to grab bottom children with n pieces (need to check)
  return solutionTree;
};

window.findNRooksSolution = function(n) {
  var solution = _solutionHelper(n, false); // correct syntax?

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};
