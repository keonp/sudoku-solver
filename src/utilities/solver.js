import cellValidation from "./cellValidation";

function solver(board, row=0, col=0) {

    let result;
    let numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // If there is no value in this cell (no user input), function will attempt to fill it with a number
    if (board[row][col].value === "") {
        for (let i = 0; i < numberList.length; i++) {

            const number = numberList[i];

            // If the number does not conflict with the rules of sudoku, this cell will be assign the value
            if (!cellValidation(board, row, col, number)) {
                board[row][col].value = number;

                
                if (col < 8) { // If current cell has a column of less than 8, call the solver function once more and increment col by 1
                    result = solver(board, row, col+1);
                } else if (col === 8 && row < 8) { // If current cell has a column of 8 and the row is less than 8, call the solver function once more and increment row by 1
                    result = solver(board, row+1, 0);
                } else {
                    // board is solved here
                    result = board;
                    return result;
                }

                // If returned result is false, assign current value of cell as blank because the combination of numbes up until this point cannot solve the puzzle
                if (result === false) {
                    board[row][col].value = "";
                } else {
                    // board is solved here
                    return result;
                }
            }
        }
        // If none of the numbers attempted work, return false as the combination of numbes up until this point cannot solve the puzzle
        return false;

    } else { // If board has a value in it already (from user) proceed to the next cell available
        if (col < 8) {
            result = solver(board, row, col+1);
        } else if (col === 8 && row < 8) {
            result = solver(board, row+1, 0);
        } else {
            // board is solved here
            result = board;
            return result;
        }
    }
    return result;
}

export default solver;