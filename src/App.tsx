import React from 'react';
import './App.css';
import { ToDo } from './components/pages/toDo/ToDo';
import { Bank } from './components/pages/bank/Bank';


function App() {

    return (
      <div className="App">
        <ToDo />
        <Bank />
      </div>     
    );
}

export default App;
