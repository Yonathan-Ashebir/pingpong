import { Provider, useSelector } from 'react-redux';
import './App.css';
import {getGameType, getStore } from './management/data';
import Game from './management/game';
import Controls from './Elements/controls';
import Ground from './Elements/ground'
import "./fonts/material-icons.css"

function App() {
  return (
    <Provider store={getStore()} >
      <Game gameType={getGameType()}/>
    </Provider>

  );
}


export default App;
