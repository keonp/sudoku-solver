import cellValidation from "./cellValidation";

function solver(board, row=0, col=0) {

    let result;
    let numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    if (board[row][col].value === "") {
        for (let i = 0; i < numberList.length; i++) {

            const number = numberList[i];

            if (cellValidation(board, row, col, number)) {
                board[row][col].value = number;

                if (col < 8) {
                    result = solver(board, row, col+1);
                } else if (col === 8 && row < 8) {
                    result = solver(board, row+1, 0);
                } else {
                    result = board;
                    return result;
                }

                if (result === false) {
                    board[row][col].value = "";
                } else {
                    return result;
                }
            }
        }
        return false;

    } else {
        if (col < 8) {
            result = solver(board, row, col+1);
        } else if (col === 8 && row < 8) {
            result = solver(board, row+1, 0);
        } else {
            result = board;
            return result;
        }
    }
    return result;
}

export default solver;