import React from 'react';
import "./styles/app.scss"
import Board from './components/Board.js'
import Login from './components/Login.js'
import RegisterForm from './components/Register.js'
import FromVerifyEmail from './components/FromVerifyEmail.jsx';
import BoardManagement from './components/BoardManagement.jsx';
import Password from './components/Password.jsx'

import VerifyEmail from './components/VerifyEmail';

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
    }




    getHeader() {
        let token = localStorage.getItem('token')
        if (token) {
            return {
                'Authorization': token,
                'Accept': 'application/json; version=2.0'
            }
        }
        return {
            'Accept': 'application/json; version=2.0'
        }
    }

    logout() {
        let headers = this.getHeader()
        axios
            .get(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/logout/`, {headers})
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        })
    }


    render () {
        return (
            <div className="app">
              <BrowserRouter>
                <Routes>
                    <Route exact path='/' element = {<Login />} />
                    <Route path='/board_management' element = {<BoardManagement getHeader={() => this.getHeader()} logout={() => this.logout()}/>} />
                    <Route path='/board/:id' element = {<Board />} />
                    <Route path='/api/users/verify/:email/:key'  element = {<FromVerifyEmail />} />
                    <Route exact path='/register' element = {<RegisterForm />}/>
                    <Route exact path='/recpassword' element = {<Password />}/>
                    <Route exact path='/verify' element = {<VerifyEmail />}/>

                    <Route path="*" element = {<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
        );
    };
    };

export default App;

