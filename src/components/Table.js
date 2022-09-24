import { useState } from 'react';

function Table() {
    const [cellStatus, setCellStatus] = useState(
        Array.from(Array(9), () => Array(9).fill({
            status: false,
            value: ""
        }))
    );

    const [inputSatus, setInputStatus] = useState(false);
    const [inputElement, setInputElement] = useState(null);
    const [inputValue, setInputValue] = useState(null);

    function handleInput(e) {
        // console.log(e.target);
        if (e.target.localName === 'input')  {
            setInputElement(e.target)
            console.log(inputElement);
        }
    }

    function handleValueChange() {

    }

    function handleKeyPress(e) {
        const targetValue = e.target.value;
        if (/^[1-9]+$/.test(+targetValue)) {
            const id = inputElement.id;
            
            const updateCells = cellStatus.map((element, rowIndex) => {
                element.map((cell, colIndex) => {

                })
            })
            console.log(inputElement.id)
            // inputElement.value = targetValue;
            // console.log(inputElement.value);
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
                                                    className='cell' disabled={inputSatus}
                                                    type="text"
                                                    defaultValue={cellStatus[rowIndex][colIndex].value}
                                                />
                                            </td>
                                        )
                                    })
                                }
                                </tr>
                            )
                        })
                    }


                    {/* <tr>
                        <td>
                            <input className="cell"></input>
                        </td>
                    </tr> */}
                </tbody>
                <tfoot>
                    <tr>
                        {
                            ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => {
                                return (
                                    <td key={`button${number}`}>
                                        <button>{number}</button>
                                    </td>
                                )
                            })
                        }
                    </tr>
                </tfoot>
            </table>
        </section>
    )
}

export default Table;