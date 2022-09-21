import React from 'react';
import "./styles/app.scss"

import Board from './components/Board.jsx'

import Login from './components/Login.jsx'
import RegisterForm from './components/Register.jsx'
import FromEmail from './components/FromEmail.jsx';
import BoardManagement from './components/BoardManagement.jsx';
import PersonalPage from './components/PersonalPage.jsx'
import Password from './components/Password.jsx'
import VerifyEmail from './components/VerifyEmail.jsx';
import ChangeEmail from './components/ChangeEmail.jsx';

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
        localStorage.setItem('username', '')
        localStorage.setItem('email', '')
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
                    <Route path='/cabinet' element = {<PersonalPage getHeader={() => this.getHeader()} logout={() => this.logout()}/>} />
                    <Route path='/board/:id' element = {<Board />} />
                    <Route path='/users/:action/:email/:key'  element = {<FromEmail />} />
                    <Route path='/profile/:new_email/:old_email/:key'  element = {<ChangeEmail />} />
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

