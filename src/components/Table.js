import { useState } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import cellValidation from '../utilities/cellValidation';

function Table() {
    const [cellStatus, setCellStatus] = useState(
        Array.from(Array(9), () => Array(9).fill(null).map(() => {
                return {
                    status: false, 
                    value: "",
                    state: false,
                    disable: true
                }
            })
        )
    );

    // const [inputSatus, setInputStatus] = useState(false);
    const [inputCell, setInputCell] = useState("");
    const [conflicts, setConflicts] = useState([""]);

    function handleInput(e) {
        if (e.target.localName === 'input')  {
            setInputCell(e.target);
        }
    }

    function updateInputCells(inputElement, value, status, conflicts=null) {
        const updateCells = [...cellStatus];
        const [row, col] = inputElement.id;

        if (value) {
            const results = cellValidation(updateCells, row, col, value);
            if (results) {
                const [_row, _col] = results;
                console.log(row, col, _row, _col)

                setConflicts([[+row, +col], [_row, _col]]);

                updateCells[_row][_col].state = 'conflict';
                updateCells[row][col].state = 'conflict';


                toggleDisable(updateCells, false, _row, _col, row, col);
            }
        }

        if (conflicts) {
            const [conrow1, concol1, conrow2, concol2] = [...conflicts[0], ...conflicts[1]];
            updateCells[conrow1][concol1].state = false;
            updateCells[conrow2][concol2].state = false;

            toggleDisable(updateCells, true, conrow1, concol1, conrow2, concol2);
            setConflicts([""]);
        }

        updateCells[row][col].status = status;
        updateCells[row][col].value = value;

        setCellStatus(updateCells);
        // revisit with regards to backspace
        setInputCell("");
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

        if (/^[1-9]+$/.test(+inputElement.value)) {
            console.log("you added a number");
            updateInputCells(inputElement, inputElement.value, true);

        } else if (inputElement.value === "") {
            console.log("you deleted a number");
            updateInputCells(inputElement, inputElement.value, false);

        } else {
            inputElement.value = "";
            console.log("invalid character")
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
            console.log(cell)

            if (button.value) {
                updateInputCells(inputCell, button.value, true);
                inputCell.value = button.value;
            } else if (CompareString(cell, conflicts[0]) || CompareString(cell, conflicts[1])) {
                updateInputCells(inputCell, "", false, conflicts);
                inputCell.value = "";
            } else {
                updateInputCells(inputCell, "", false);
                inputCell.value = "";
            } 
        }
    }

    return (
        <section>
            <table>
                <tbody onClick={(e) => handleInput(e)} onChange={(e) => handleKeyPress(e)}>
                    {
                        cellStatus.map((row, rowIndex) => {
                            return (
                                // Return each row
                                <tr key={`row${rowIndex}`}>
                                {
                                    row.map((column, colIndex) => {
                                        // Return a cell for each column in the row
                                        return (
                                            <td key={`${rowIndex}${colIndex}`}>
                                                <input
                                                    id={`${rowIndex}${colIndex}`}
                                                    className={`cell ${cellStatus[rowIndex][colIndex].state}`}
                                                    disabled={!cellStatus[rowIndex][colIndex].disable}
                                                    type="text"
                                                    defaultValue={cellStatus[rowIndex][colIndex].value}
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
                    <tr>
                        {
                            ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => {
                                return (
                                    <td key={`button-${number}`}>
                                        <button value={number} onClick={(e) => handleButtonPress(e)}>{number}</button>
                                    </td>
                                )
                            })
                        }
                        <td>
                            <button value="" onClick={(e) => handleButtonPress(e)}>
                                <RiDeleteBack2Line />
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </section>
    )
}

export default Table;