import { useState } from 'react';

function Table() {
    const [cellStatus, setCellStatus] = useState(
        Array.from(Array(9), () => Array(9).fill(false))
    );

    const [inputSatus, setInputStatus] = useState(false);

    function handleInput(e) {
        // console.log(e.target);
        if (e.target.localName === 'input') console.log('true');
    }



    return (
        <section>
            <table>
                <tbody onClick={(e) => handleInput(e)}>
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
                                                <input className='cell' disabled={inputSatus} type="text"/>
                                                {/* defaultValue={`${rowIndex}${colIndex}` */}
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