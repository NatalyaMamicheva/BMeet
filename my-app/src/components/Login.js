import {Link, Navigate} from 'react-router-dom';
import "../styles/login.scss";
import React from 'react'
import axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'email': '',
            'password': '',
            'token': ''
        }
    }

    getToken() {
        axios
            .post(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/login/`, {'email': this.state.email, 'password': this.state.password})
            .then(response => {
                const token = response.data.token
                localStorage.setItem('token', token)
                localStorage.setItem('email', this.state.email)
                this.setState({
                    'token': token,
                })
            })
            .catch(error => console.log(error))
    }

    handleSubmit(event) {
        console.log(this.state.email, this.state.password)
        this.getToken(this.state.email, this.state.password)
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

 render(){
    if (localStorage.getItem('token')) return <Navigate  to="/board_management" />;
    else
        return(
             <div className='login'>
                <div className='login_form'>
                    <div className='logo'>
                        <span className='yellow'>B</span>
                        <span className='blue'>M</span>
                        <span className='yellow'>ee</span>
                        <span className='blue'>t</span>
                    </div>
                    <div className='welcome'>
                        Добро пожаловать!
                    </div>
                    <div className='in'>
                        Пожалуйста, войдите в Ваш аккаунт
                    </div>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <div className='head_email'>
                            Email
                        </div>
                        <input className='input_class_email' type="email" placeholder="bmeet@gmail.com" name="email"
                             required onChange={(event) => this.handleChange(event)} value={this.state.email}></input>
                        <div className='head_password'>
                            Пароль
                        </div>
                        <Link className='pass' to='/recpassword'>Забыли пароль?</Link>
                        <input className='input_class_pass' type="password" name="password" required
                            onChange={(event) => this.handleChange(event)} value={this.state.password}></input>
                        <button type='submit' className='entr'><p className='en'>Войти</p></button>
                    </form>
                    <div className='head_reg'>Впервые на платформе?</div>
                    <Link className='reg' to='/register'>Создать аккаунт</Link>
                </div>
            </div>
        );
 };
}

export default Login;