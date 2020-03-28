import React from 'react';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import Grid from './components/Grid'
import './App.css';

function App() {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <Grid column={1000} row={1000000}/>
      </DndProvider>
    </div>
  );
}

export default App;
