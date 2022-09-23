import {Link, Navigate} from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import VerifyEmail from "./VerifyEmail";
import "../styles/auth_style.scss";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.email = '';
        this.id = null;
        this.username = '';
        this.password = '';
        this.state = {
            'username': '',
            'email': '',
            'password': '',
            'success': false,
            'error_message_username': '',
            'error_message_email': '',
            'error_message': ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/register/`,
                {
                    'username': this.state.username,
                    'email': this.state.email,
                    'password': this.state.password
                }
            )
            .then(response => {
                this.email = response.data.email
                this.id = response.data.id
                this.username = response.data.username
                this.password = response.data.password
                this.setState({
                    'username': '',
                    'email': '',
                    'password': '',
                    'success': true,
                    'error_message_username': '',
                    'error_message_email': '',
                    'error_message': ''
                });
            })
            .catch(error => {
                this.setState({
                    'error_message_username': '',
                    'error_message_email': '',
                    'error_message': ''
                });
                if (!error.response.data)
                    this.setState({error_message: error.message});
                else {
                    if (error.response.data.email)
                        this.setState({error_message_email: error.response.data.email});
                    if (error.response.data.username)
                        this.setState({error_message_username: error.response.data.username});
                }
                ;
                this.errorRef.current.focus();
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        if (localStorage.getItem('token')) return <Navigate
            to="/board_management"/>
        if (this.state.success) {
            return (
                <VerifyEmail email={this.email} id={this.id}
                             username={this.username}
                             password={this.password}/>
            )
        } else {
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
                                    <p>Приветствуем!</p>
                                    <span>Зарегистрируйтесь, чтобы начать пользоваться<br/>платформой</span>
                                </div>
                                <p className='error_p'
                                   ref={this.errorRef}>{this.state.error_message}</p>
                                <div className='auth_form'>
                                    <form
                                        onSubmit={(event) => this.handleSubmit(event)}>
                                        <div className='auth_input'>

                                            <div className='auth_title_input'>
                                                <span>Username</span>
                                            </div>
                                            <div className='auth_input_border'>
                                                <label>
                                                    <input
                                                        className='auth_input_text'
                                                        id='username'
                                                        name='username'
                                                        type="text"
                                                        placeholder="bmeet"
                                                        required
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.username}></input>
                                                </label>
                                            </div>
                                            <p className='error_p'
                                               ref={this.errorRef}>{this.state.error_message_username}</p>
                                            <div className='auth_title_input'>
                                                <span>Email</span>
                                            </div>
                                            <div className='auth_input_border'>
                                                <label>
                                                    <input
                                                        className='auth_input_text'
                                                        id='email' type="email"
                                                        name="email"
                                                        placeholder="bmeet@gmail.com"
                                                        required
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.email}/>
                                                </label>
                                            </div>
                                            <p className='error_p'
                                               ref={this.errorRef}>{this.state.error_message_email}</p>
                                            <div className='auth_title_input'>
                                                <span>Пароль</span>
                                            </div>
                                            <div className='auth_input_border'>
                                                <label>
                                                    <input
                                                        className='auth_input_text'
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="************"
                                                        required
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.password}/>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='auth_input_button'>
                                            <button
                                                className='auth_button_form'
                                                type="submit" value="submit">
                                                <p>Зарегистрироваться</p>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className='auth_header'>
                                    <p className='auth_header_p'>
                                        У вас уже есть аккаунт?</p>
                                    <Link className='auth_header_a' to='/'>Войти
                                        в аккаунт</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer'>
                        <p>COPYRIGHT © 2022</p>
                        <p className='footer_bmeet'>BMeet</p>
                    </div>
                </div>
            )
        }
    }
}

export default RegisterForm;