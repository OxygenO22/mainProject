import React from 'react';
import './App.css';
import { ToDo } from './components/pages/toDo/ToDo';
import { Bank } from './components/pages/bank/Bank';
import { Extension } from 'typescript';
import { SuperCrosses } from './components/ui/extraLesson/superCrosses/SuperCrosses';
import { SuperButton } from './components/ui/extraLesson/SuperButton';
import { Modal } from './components/ui/extraLesson/modal/Modal';
import { MainWithIgor } from './components/pages/withIgor/MainWithIgor';
import { Router } from './components/layout/sections/Router';


function App() {
    return (
      <div className="App">
        <Router />
      </div>
    );
}

export default App;
