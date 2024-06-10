import React from 'react';
import './App.css';
import { ToDo } from './components/pages/toDo/ToDo';
import { Bank } from './components/pages/bank/Bank';
import { Extension } from 'typescript';
import { SuperCrosses } from './components/ui/extraLesson/superCrosses/SuperCrosses';
import { SuperButton } from './components/ui/extraLesson/SuperButton';
import { Modal } from './components/ui/extraLesson/modal/Modal';


function App() {

   const croses = [
    { id: 1, model: "ADIDAS", size: 'XXX' },
    { id: 2, model: "ABIBAS", size: 'YYY' },
    { id: 3, model: "PUMA", size: 'ZZZ' }
]
    return (
      <div className="App">
        <ToDo />
        {/* <Bank /> */}
       {/*  <SuperCrosses croses={croses} /> */}
        {/* <Modal>
          <input type="text" placeholder="email" />
          <input type="password" placeholder="pass" />
          <button>send</button>
        </Modal>
        <Modal>
          <div>
            <p>Hello</p>
          </div>
          <input type="text" placeholder="email" />
          <input type="password" placeholder="pass" />
          <label>
            <input type="checkbox" />
            <span>I agree</span>
          </label>
          <button>send</button>
        </Modal> */}
      </div>
    );
}

export default App;
