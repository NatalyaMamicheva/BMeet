import React from 'react';
import "./styles/app.scss"
import Board from './components/Board/Board.jsx'
import Login from './components/AuthUser/Login.jsx'
import RegisterForm from './components/AuthUser/Register.jsx'
import FromEmail from './components/AuthUser/FromEmail.jsx';
import BoardManagement from './components/BoardManagement/BoardManagement.jsx';
import PersonalPage from './components/Cabinet/PersonalPage.jsx'
import Password from './components/AuthUser/Password.jsx'
import ChangeEmail from './components/Cabinet/ChangeEmail.jsx';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}



class App extends React.Component {

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
        localStorage.setItem('token', '')
        localStorage.setItem('username', '')
        localStorage.setItem('email', '')
        this.setState({
            'token': ''
        })
    }


    render() {
        return (
            <div className="app">
                <div className='content'>
                    <BrowserRouter>
                        <Routes>
                            <Route exact path='/' element={<Login />} />
                            <Route path='/board_management' element={<BoardManagement getHeader={() => this.getHeader()} logout={() => this.logout()} />} />
                            <Route path='/cabinet' element={<PersonalPage getHeader={() => this.getHeader()} logout={() => this.logout()} />} />
                            <Route path='/board/:id' element={<Board />} />
                            <Route path='/users/:action/:email/:key' element={<FromEmail />} />
                            <Route path='/profile/:old_email/:new_email/:key' element={<ChangeEmail />} />
                            <Route exact path='/register' element={<RegisterForm />} />
                            <Route exact path='/recpassword' element={<Password />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        );
    };
};

export default App;

