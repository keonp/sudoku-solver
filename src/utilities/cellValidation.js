function cellValidation(board, row, col, input) {

    function rowChecker(board, row, input) {
        for (let col = 0; col < 9; col ++) {
            if (board[row][col].value === input) {
                // return [[row][col]];
                return [+row, col];                
            }
        }
        return false;
    }

    function colChecker (board, col, input) {
        for (let row = 0; row < 9; row ++) {
            if (board[row][col].value === input) {
                // return [[row][col]];
                return [row, +col];
            }
            
        }
        return false;
    }

    function subGridChecker (board, row, col, input) {
        const rowStart = row - (row % 3);
        const rowEnd = rowStart + 2;
        const colStart = col - (col % 3);
        const colEnd = colStart + 2;

        for (let _row = rowStart; _row <= rowEnd; _row++) {
            for (let _col = colStart; _col <= colEnd; _col++) {
                if (board[_row][_col].value === input) {
                    // return [[row][col]];
                    return [_row, _col];

                }
            }
        }

        return false;
    }

    return (rowChecker(board, row, input) || colChecker(board, col, input) || subGridChecker(board, row, col, input));
    // RowChecker(board, row, input);
    // ColChecker (board, col, input);
    // subGridChecker(board, row, col, input);
}

export default cellValidation;