import './App.scss';
import Table from './components/Table';
// import { useState } from 'react';

function App() {

  // const [classField, setClassField] = useState(false);

  // function handleClick() {
  //   setClassField(!classField);
  // }

  return (
    <div className="App">
      <h1>Sudoku Solver</h1>
      <Table />
    </div>
  );
}

export default App;
