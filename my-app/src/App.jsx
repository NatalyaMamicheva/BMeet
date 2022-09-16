import React from 'react';
import "./styles/app.scss"
import Board from './components/Board.js'
import Login from './components/Login.js'
import RegisterForm from './components/Register.js'
import FromVerifyEmail from './components/FromVerifyEmail.jsx';
import BoardManagement from './components/BoardManagement.jsx';
import Password from './components/Password.jsx'
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import axios from 'axios'


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}



class App extends React.Component {
    constructor(props) {
       super(props)
       this.errorRef = React.createRef();
       this.state = {
           'token': '',
       }
    }


  render () {
        return (
            <div className="app">
              <p ref={this.errorRef} >{this.state.error_message}</p>
              <BrowserRouter>
                <Routes>
                    <Route exact path='/' element = {<Login />} />
                    <Route path='/board_management' element = {<BoardManagement />} />
                    <Route path='/board/:id' element = {<Board />} />
                    <Route path='/api/users/verify/:email/:key'  element = {<FromVerifyEmail />} />
                    <Route exact path='/register' element = {<RegisterForm />}/>
                    <Route exact path='/recpassword' element = {<Password />}/>
                    <Route path="*" element = {<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
        );
    };
};

export default App;

