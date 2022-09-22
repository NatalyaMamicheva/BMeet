import {Link, Navigate} from 'react-router-dom';
import "../styles/auth_style.scss";
import React from 'react'
import axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            'email': '',
            'password': '',
            'token': '',
            'error_message_user': '',
            'error_message': ''
        }
    }

    getToken() {
        axios
            .post(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/login/`, {
                'email': this.state.email,
                'password': this.state.password
            })
            .then(response => {
                const token = response.data.token
                localStorage.setItem('token', token)
                localStorage.setItem('email', this.state.email)
                localStorage.setItem('username', response.data.username)
                this.setState({
                    'token': token,
                })
            })
            .catch(error => {
                this.setState({
                    'error_message_user': '',
                    'error_message': ''
                });
                if (!error.response.data)
                    this.setState({error_message: error.message});
                else {
                    this.setState({error_message_user: "Неверный Email или пароль"});
                }
                this.errorRef.current.focus();
            })

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

    render() {
        if (localStorage.getItem('token')) return <Navigate
            to="/board_management"/>;
        else
            return (
                <div className='content'>
                    <div className='auth'>
                        <div className='auth_form_table'>
                            <div className='auth_logo'>
                                <span className='auth_yellow'>B</span>
                                <span className='auth_blue'>M</span>
                                <span className='auth_yellow'>ee</span>
                                <span className='auth_blue'>t</span>
                            </div>
                            <div className='auth_content'>
                                <div className='auth_title'>
                                    <p>Добро пожаловать!</p>
                                    <span>Пожалуйста, войдите в Ваш аккаунт</span>
                                </div>
                                <div className='auth_form'>
                                    <form
                                        onSubmit={(event) => this.handleSubmit(event)}>

                                        <div className='auth_input'>

                                            <div className='auth_title_input'>
                        <span>
                            Email / Username
                        </span>
                                            </div>
                                            <div className='auth_input_border'>
                                                <label>
                                                    <input
                                                        className='auth_input_text'
                                                        placeholder='user@example.com'
                                                        type="text"
                                                        name="email"
                                                        required
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.email}>
                                                    </input>
                                                </label>
                                            </div>


                                            <div className='auth_title_input'>
                            <span>
                                        Пароль
                                    </span>
                                                <Link to='/recpassword'>Забыли
                                                    пароль?</Link>
                                            </div>

                                            <div className='auth_input_border'>
                                                <label>
                                                    <input
                                                        className='auth_input_text'
                                                        placeholder='password'
                                                        type="password"
                                                        name="password"
                                                        required
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.password}>
                                                    </input>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='auth_input_button'>
                                            <button type='submit'
                                                    className='auth_button_form'>
                                                <p>Войти</p></button>
                                        </div>
                                                <p className='error_p' ref={this.errorRef} >{this.state.error_message}</p>
                                                <p className='error_p' ref={this.errorRef} >{this.state.error_message_user}</p>
                                    </form>
                                </div>

                                <div className='auth_header'>
                                        <p className='auth_header_p'>Впервые на
                                        платформе?
                                    </p>
                                    <Link className='auth_header_a'
                                          to='/register'>Создать
                                        аккаунт</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer'>
                        <p>COPYRIGHT © 2022</p>
                        <p className='footer_bmeet'>BMeet</p>
                    </div>
                </div>
            );
    };
}

export default Login;