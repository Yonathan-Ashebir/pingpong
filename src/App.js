import { Provider } from "react-redux";
import { Routes, Route } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import { Home } from './Elements/home';
import { LinearRangeSelector } from "./Elements/LinearRangeSelector";
import "./fonts/material-icons.css";
import { getGameType, getStore } from './management/data';
import Game from './management/game';


function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route index element={<Home />}></Route>
    //     <Route path='/game' element={
    //       <Provider store={getStore()} >
    //         <Game gameType={getGameType()} />
    //       </Provider>
    //     }>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <LinearRangeSelector values={[1,2,3,4,5]} initial={1}></LinearRangeSelector>
  )
}


export default App;
