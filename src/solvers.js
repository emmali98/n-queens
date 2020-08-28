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

window._solver = function(n, isQueens) {
  var results = [];
  var currentMatrix = [];
  var possibleRows = [];

  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push(0);
    }
    row[i] = 1;
    possibleRows.push(row);
  }

  var helper = function (currentMatrix, rowIndex) {
    for (var i = 0; i < n; i++) {
      currentMatrix.push(possibleRows[i]);
      var currentBoard = new Board(currentMatrix);

      if ((isQueens && !currentBoard.hasAnyQueensConflicts()) ||
      (!isQueens && !currentBoard.hasAnyRooksConflicts())) {
        if (rowIndex === n - 1) {
          results.push(currentMatrix);
        } else {
          helper(currentMatrix, rowIndex + 1);
        }
      }
      currentMatrix = currentMatrix.slice(0, rowIndex);
    }
    return results;
  };

  return helper(currentMatrix, 0);
};

window.findNRooksSolution = function(n) {
  var solution = window._solver(n, false)[0];

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = window._solver(n, false).length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

  var solution;
  if (window._solver(n, true).length === 0) {
    solution = makeEmptyMatrix(n);
  } else {
    solution = window._solver(n, true)[0];
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = n === 0 ? 1 : window._solver(n, true).length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
