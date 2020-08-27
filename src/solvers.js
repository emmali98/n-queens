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

window._Tree = function(arr) {
  this.board = arr;
  this.children = [];
};

window._solutionHelper = function(n, isQueens) {
  var empty = [];
  for (var i = 0; i < n * n; i++) {
    empty.push(0);
  }

  var addChildren = function(tree) {
    // looks at tree.board and searches for indexOf the last occurring 1
    var idx = tree.board.lastIndexOf(1) === -1 ? 0 : (tree.board.lastIndexOf(1) + 1);
    if (n === 1) {
      tree.board[0] = 1;
      return tree;
    } else if (idx === (n * n - 1)) {
      return tree;
    } else {
      for (var i = idx; i < n * n; i++) {
        //   childBoard = tree.board.slice(), childBoard[i] changed from 0 to 1
        var childBoard = tree.board.slice();
        childBoard[i] = 1;
        //   check childBoard for conflicts, change back to matrix for checks
        childBoard = new Board(window.arrayToMatrix(childBoard, n));

        if (isQueens && !childBoard.hasAnyQueensConflicts()) {
          var childTree = new window._Tree(childBoard.rows().flat());
          childTree = addChildren(childTree);
          tree.children.push(childTree);
        } else if (!isQueens && !childBoard.hasAnyRooksConflicts()) {
          var childTree = new window._Tree(childBoard.rows().flat());
          childTree = addChildren(childTree);
          tree.children.push(childTree);
        }
      }
      return tree;
    }
  };

  var solutionTree = addChildren(new window._Tree(empty));
  var grabChildren = function(tree) {
    var validChildren = [];
    if (tree.children.length > 0) {
      for (var i = 0; i < tree.children.length; i++) {
        validChildren = validChildren.concat(grabChildren(tree.children[i]));
      }
    } else {
      var sum = tree.board.reduce((acc, currentVal) => acc + currentVal, 0);
      if (sum === n) {
        validChildren.push(tree.board);
      }
    }
    return validChildren;
  };
  //   return grabChildren(solutionTree);
  var solutions = _.map(grabChildren(solutionTree), function(val) {
    return window.arrayToMatrix(val, n);
  });

  return solutions;
};

window.arrayToMatrix = function(arr, n) {
  var array = arr.slice();
  var matrix = [];
  for (var i = 0; i < n * n; i = i + n) {
    matrix.push(array.splice(0, n));
  }
  return matrix;
};

window.findNRooksSolution = function(n) {
  var solution = 0; //window._solutionHelper(n, false)[0];

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;//window._solutionHelper(n, false).length;

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
