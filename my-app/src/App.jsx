import React from 'react';
import "./styles/app.scss"
import Board from './components/Board.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import {BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}




const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element = {<Login />} />
            <Route path='/board/:id' element = {<Board />} />
            <Route exact path='/register' element = {<Register />}/>
            <Route path="*" element = {<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
};



// const App = () => {
//   return (
//     <div className="app">
//       <Toolbar />
//       <SettingBar />
//       <Canvas />
//     </div>
//
//   );
// };

export default App;

