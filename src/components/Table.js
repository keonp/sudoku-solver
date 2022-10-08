import { useState } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import cellValidation from '../utilities/cellValidation';
import solver from '../utilities/solver';

function Table() {
    const [cellStatus, setCellStatus] = useState(
        Array.from(Array(9), () => Array(9).fill(null).map(() => {
                return {
                    // status if cell is empty or not
                    status: false, 
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
    const [solved, setSolved] = useState(false);
    const [userInputState, setUserInputState] = useState(false);
    const [disableAll, setdisableAll] = useState(false);


    function handleInput(e) {
        if (e.target.localName === 'input')  {
            // console.log(e.target)
            console.log(e.target.value)
            // setEmptyString(e.target.value);
            setInputCell(e.target);
        }
    }

    function updateInputCells(inputElement, value, status, conflicts=null) {
        const updateCells = [...cellStatus];
        const [row, col] = inputElement.id;

        if (value) {
            const results = cellValidation(updateCells, row, col, value);

            // If there is a conflict according to the rules of sudoku
            if (results) {
                const [_row, _col] = results;
                console.log(row, col, _row, _col)

                setConflicts([[+row, +col], [_row, _col]]);
                setConflictingValue(value);

                updateCells[_row][_col].state = 'conflict';
                updateCells[row][col].state = 'conflict';
                setDisableNumbers(true);

                toggleDisable(true, updateCells, false, _row, _col, row, col);

            // if there are no conflicts
            } else {
                updateCells[row][col].state = userInputState;
            }
        // If there is no value (a backspace)
        } else {
            updateCells[row][col].state = "";
        }

        if (conflicts) {
            const [conrow1, concol1, conrow2, concol2] = [...conflicts[0], ...conflicts[1]];

            if (updateCells[conrow1][concol1].state === updateCells[row][col].state) {
                updateCells[conrow1][concol1].state = "";
            } else {
                updateCells[conrow1][concol1].state = userInputState;
            }

            if (updateCells[conrow2][concol2].state === updateCells[row][col].state) {
                updateCells[conrow2][concol2].state = "";
            } else {
                updateCells[conrow2][concol2].state = userInputState;
            }
            // updateCells[conrow1][concol1].state = "";
            // updateCells[conrow2][concol2].state = "";
            setDisableNumbers(false);

            toggleDisable(true, updateCells, true, conrow1, concol1, conrow2, concol2);
            setConflicts([]);
            setConflictingValue(null);
        }

        updateCells[row][col].status = status;
        updateCells[row][col].value = value;

        setCellStatus(updateCells);
        inputCell.focus();
        // setInputCell("");
    }

    function toggleDisable(forConflicts, array, status, row1, col1, row2, col2) {
        if (forConflicts) {
            array.forEach((element, rIndex) => {
                element.forEach((cell, cIndex) => {
                    if ((row1 === rIndex && col1 === cIndex) || (+row2 === rIndex && +col2 === cIndex)) {
                    } else {
                        array[rIndex][cIndex].disable = status;
                    }
                })
            })
        }
    }


    function handleKeyPress(e) {
        const inputElement = e.target;
        const cell = [...inputElement.id];
        console.log(inputElement)
        const isNumber = (/^[1-9]+$/.test(+inputElement.value));

        if (!(isNumber && conflictingValue)) {
            if (isNumber) {
                console.log("you added the number: " +inputElement.value);
                updateInputCells(inputElement, inputElement.value, true);
    
            } else if (inputElement.value === "" && conflicts[0] && (CompareString(cell, conflicts[0]) || CompareString(cell, conflicts[1]))) {
                console.log("you deleted a number");
                updateInputCells(inputElement, inputElement.value, false, conflicts);
    
            } else if (inputElement.value === "") {
                console.log("you deleted a number");
                updateInputCells(inputElement, inputElement.value, false);
    
            } else {
                inputElement.value = "";
                console.log("invalid character")
            }
        }

    }

    function CompareString(object1, object2) {
        console.log(object1.toString())
        console.log(object2.toString())
        return object1.toString() === object2.toString();
    }

    function handleButtonPress(e) {

        if (inputCell) {
            const button = e.target;


            const cell = [...inputCell.id];

            if (button.value === inputCell.value) {
                inputCell.focus();
            } else if (button.value) {
                updateInputCells(inputCell, button.value, true);
                inputCell.value = button.value;
            } else if (conflicts[0] && (CompareString(cell, conflicts[0]) || CompareString(cell, conflicts[1]))) {
                updateInputCells(inputCell, "", false, conflicts);
                inputCell.value = "";
            } else {
                updateInputCells(inputCell, "", false);
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

        console.log(updateCells);

        setUserInputState('userInputDisabled');
        setdisableAll(true);
        setCellStatus(solver(updateCells));
        setSolved(true);
    }

    function handleRefresh() {

        const updateCells = [...cellStatus];
        refreshTable(updateCells);
        setUserInputState(false);
        setdisableAll(false);
        setSolved(false);
        setInputCell("");
        // setCellStatus(updateCells);
    }

    function refreshTable(table) {
        table.forEach((row) => {
            row.forEach((cell) => {
                cell.status = false;
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
                    <button disabled={solved} onClick={solvePuzzle}>Solve Puzzle</button>
                    <button onClick={handleRefresh}>Restart</button>
                </div>
            </div>
        </section>
    )
}

export default Table;