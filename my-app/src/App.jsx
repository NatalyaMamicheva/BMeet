import React from 'react';
import "./styles/app.scss"
import Board from './components/Board.js'
import Login from './components/Login.js'
import RegisterForm from './components/Register.js'
import Password from './components/Password.jsx'
import {BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'
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
       this.state = {
           'token': '',
           'username': '',
           'email': ''
       }
    }
//
//     register(username, email, password) {
//         axios
//             .post(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/register/`,
//                     {'username': username, 'email': email, 'password': password}
//                   )
//             .then(response => {
//                 const username = response.data.username
//                 const email = response.data.email
//                 this.setState({
//                     'username': username,
//                     'email': email
//                 })
//             })
//             .catch(error => console.log(error))
//     }

  render () {
        return (
            <div className="app">
              <BrowserRouter>
                <Routes>
                    <Route exact path='/' element = {<Login />} />
                    <Route path='/board/:id' element = {<Board />} />
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

