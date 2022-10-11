function AboutModal({setAboutToggle}) {

    function handleAboutToggle(targetClass) {
        if (targetClass === 'aboutModalContainer') {
            setAboutToggle(false);
        }
    }

    return (
        <div onClick={(e) => handleAboutToggle(e.target.className)} className="aboutModalContainer">
            <div className="aboutPage">
                <button onClick={() => setAboutToggle(false)} className="closeButton">
                    <span className="sr-only">close button</span>
                    X
                </button>
                <h2>Sudoku solver</h2>
                <p>Are you struggling with a tough Sudoku puzzle? Fret not! With this Sudoku Solver, you can find the answer to any Sudoku puzzle no matter how difficult!</p>

                <h2>What do you need to do?</h2>
                <p>With the current puzzle you are working on in hand, input the numbers into each square until the puzzle on screen matches the base puzzle you have. Then press the 'solve puzzle' button and watch as the solver completes the puzzle in an instant!</p>
                <p>When you're done with the completed puzzle, you can select 'restart' to clear the board and solve a new puzzle.</p>
                <p><strong>You may also use your keyboard instead of the number buttons on screen!</strong></p>

                <h2>How does it work?</h2>
                <p>The program utilizes a recursive backtracking algorithm/brute force method to solve the puzzle. It attempts to input a number in an empty cell, starting from the cell in the first row and column, while complying with the rules of sudoku. It will continue to do so until it completes the puzzle or gets to a cell where no numbers can be used. In that instance, it will backtrack to the previous cell and attempt a different number, where it will then continue forward or backtrack again.</p>
            </div>
        </div>
    )
}

export default AboutModal;