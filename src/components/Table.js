import { useState } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import cellValidation from '../utilities/cellValidation';
import solver from '../utilities/solver';

function Table() {
    const [cellStatus, setCellStatus] = useState(
        Array.from(Array(9), () => Array(9).fill(null).map(() => {
                return {
                    // value of the cell
                    value: "",
                    // state for conflict
                    state: "",
                    // disable to disable cells
                    disable: true
                }
            })
        )
    );

    const [inputCell, setInputCell] = useState("");
    const [conflicts, setConflicts] = useState([]);
    const [conflictingValue, setConflictingValue] = useState(null);
    const [disableNumbers, setDisableNumbers] = useState(false);
    const [toggleSolved, setToggleSolved] = useState(false);
    const [userInputState, setUserInputState] = useState(false); // A state that acts as a toggle for adding a class that identifies inputs added by the user
    const [disableAll, setDisableAll] = useState(false);


    function handleInput(e) {
        if (e.target.localName === 'input')  {
            setInputCell(e.target);
        }
    }

    function updateInputCells(inputElement, value, conflictsArray=null) {
        const updateCells = [...cellStatus];
        const [row, col] = inputElement.id;

        if (value) {
            const results = cellValidation(updateCells, row, col, value);

            // If there is a conflict according to the rules of sudoku
            if (results) {
                const [_row, _col] = results;
                setConflicts([[+row, +col], [_row, _col]]);
                setConflictingValue(value);
                updateCells[_row][_col].state = 'conflict';
                updateCells[row][col].state = 'conflict';
                setDisableNumbers(true);
                setToggleSolved(true);
                toggleDisable(updateCells, false, _row, _col, row, col);

            // If there are no conflicts
            } else {
                updateCells[row][col].state = userInputState;
            }
        // If there is no value (due to a backspace)
        } else {
            updateCells[row][col].state = "";
        }

        // If a conflict is being resolved
        if (conflictsArray) {
            const [conrow1, concol1, conrow2, concol2] = [...conflictsArray[0], ...conflictsArray[1]];

            // check if cell @ conflict coordinates has a state equal to the cell state that was JUST assigned "" on line 62
            if (!(updateCells[conrow1][concol1].state === updateCells[row][col].state)) {
                updateCells[conrow1][concol1].state = userInputState;
            } else {
                updateCells[conrow2][concol2].state = userInputState;
            }

            setDisableNumbers(false);
            setToggleSolved(false);
            toggleDisable(updateCells, true, conrow1, concol1, conrow2, concol2);
            setConflicts([]);
            setConflictingValue(null);
        }

        updateCells[row][col].value = value;
        setCellStatus(updateCells);
        inputCell.focus();
    }

    function toggleDisable(array, status, row1, col1, row2, col2) {
        array.forEach((element, rIndex) => {
            element.forEach((cell, cIndex) => {
                if ((row1 === rIndex && col1 === cIndex) || (+row2 === rIndex && +col2 === cIndex)) {
                } else {
                    array[rIndex][cIndex].disable = status;
                }
            })
        })
    }


    function handleKeyPress(e) {
        const inputElement = e.target;
        const cell = [...inputElement.id];
        const isNumber = (/^[1-9]+$/.test(+inputElement.value));

        if (!(isNumber && conflictingValue)) {
            if (isNumber) {
                console.log("you added the number: " +inputElement.value);
                updateInputCells(inputElement, inputElement.value);
    
            } else if (inputElement.value === "" && conflicts[0] && (CompareString(cell, conflicts[0]) || CompareString(cell, conflicts[1]))) {
                console.log("you deleted a conflicting number");
                updateInputCells(inputElement, inputElement.value, conflicts);
    
            } else if (inputElement.value === "") {
                console.log("you deleted a number");
                updateInputCells(inputElement, inputElement.value);
    
            } else {
                inputElement.value = "";
                console.log("invalid character")
            }
        }
    }

    function CompareString(object1, object2) {
        return object1.toString() === object2.toString();
    }

    function handleButtonPress(e) {

        if (inputCell) {
            const button = e.target;

            const cell = [...inputCell.id];

            // if you pressed a button with the same number was the number in the selected cell
            if (button.value === inputCell.value) {
                inputCell.focus();

            } else if (button.value) {
                updateInputCells(inputCell, button.value);
                inputCell.value = button.value;

            } else if (conflicts[0] && (CompareString(cell, conflicts[0]) || CompareString(cell, conflicts[1]))) {
                updateInputCells(inputCell, "", conflicts);
                inputCell.value = "";

            } else {
                updateInputCells(inputCell, "");
                inputCell.value = "";
            }
        }
    }

    function handleTab(e) {
        setInputCell(e.target)
    }

    // solves the puzzle
    function solvePuzzle() {
        const updateCells = [...cellStatus];
        setUserInputState('userInputDisabled');
        setDisableAll(true);
        setCellStatus(solver(updateCells));
        setToggleSolved(true);
    }

    function handleRefresh() {
        const updateCells = [...cellStatus];
        refreshTable(updateCells);
        setUserInputState(false);
        setDisableAll(false);
        setToggleSolved(false);
        setInputCell("");
        setDisableNumbers(false);
        setConflicts([]);
        setConflictingValue(null);
    }

    function refreshTable(table) {
        table.forEach((row) => {
            row.forEach((cell) => {
                cell.value = "";
                cell.state = "";
                cell.disable = true;
            })
        })
        setCellStatus(table);
    }

    function handleValue() {
        // do nothing function to handle value overwriting defaultValue issue
    }


    return (
        <section className='sudokuDisplay'>
            <div className='wrapper'>
                <h1>Sudoku Solver</h1>
                <table>
                    <tbody
                        onClick={(e) => handleInput(e)}
                        onChange={(e) => handleKeyPress(e)}
                        onKeyUp={(e) => handleTab(e)}
                    >
                        {
                            cellStatus.map((row, rowIndex) => {
                                return (
                                    // Return each row
                                    <tr key={`row${rowIndex}`}>
                                    {
                                        row.map((column, colIndex) => {
                                            // Return a cell for each column in the row
                                            return (
                                                <td
                                                    key={`${rowIndex}${colIndex}`}
                                                    className={`${(colIndex === 2 || colIndex === 5) ? `sideBorder` : null} ${(rowIndex === 2 || rowIndex === 5) ? `bottomBorder` : null}`}
                                                >
                                                    <input
                                                        id={`${rowIndex}${colIndex}`}
                                                        className={`cell r${rowIndex}c${colIndex} ${(cellStatus[rowIndex][colIndex].state === "conflict") ? cellStatus[rowIndex][colIndex].state
                                                                : (userInputState && cellStatus[rowIndex][colIndex].state !== "") ? userInputState
                                                                : cellStatus[rowIndex][colIndex].state}`
                                                        }
                                                        disabled={disableAll || !cellStatus[rowIndex][colIndex].disable}
                                                        type="text"
                                                        onChange={() => handleValue()}
                                                        value={cellStatus[rowIndex][colIndex].value}
                                                        maxLength={1}
                                                    />
                                                </td>
                                            )
                                        })
                                    }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr className='inputButtonsRow'>
                            {
                                ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => {
                                    return (
                                        <td className='numberContainer' key={`button-${number}`}>
                                            <button className='inputButtons' value={number} disabled={disableNumbers || disableAll} onClick={(e) => handleButtonPress(e)}>{number}</button>
                                        </td>
                                    )
                                })
                            }
                            <td className='numberContainer'> 
                                <button className='inputButtons backspaceButton' value="" disabled={disableAll} onClick={(e) => handleButtonPress(e)}>
                                    <RiDeleteBack2Line />
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <div className='buttonSelections'>
                    <button disabled={toggleSolved} onClick={solvePuzzle}>Solve Puzzle</button>
                    <button onClick={handleRefresh}>Restart</button>
                </div>
            </div>
        </section>
    )
}

export default Table;