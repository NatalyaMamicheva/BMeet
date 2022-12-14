import {Link, Navigate} from 'react-router-dom';
import "../../styles/auth_style.scss";
import React from 'react'
import axios from 'axios'
import VerifyEmail from "./VerifyEmail";
import Footer from "../Footer";


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            'id': null,
            'email': '',
            'password': '',
            'token': '',
            'error_message_user': '',
            'error_message': '',
            'block_info_timer': '',
            'not_verify': false
        }
    }

    getToken() {
        axios
            .post(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/login/`, {
                'email': this.state.email,
                'password': this.state.password
            })
            .then(response => {
                this.setState({'token': response.data.token});
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('username', response.data.username)
            })
            .catch(error => {
                this.setState({
                    'error_message_user': '',
                    'error_message': '',
                    'block_info_timer': '',
                });
                if (!error.response.data)
                    this.setState({error_message: error.message});
                else {
                    if (error.response.status === 429) {
                        let unblock_time = error.response.data['time'].split('.')[0]
                        this.startTimer(unblock_time)
                        this.clearInputPassword()
                    }
                    if (error.response.status === 400) {
                        this.setState(
                            {error_message_user: "Неверный Email или пароль"}
                        )
                        this.clearInputPassword()
                    }
                    if (error.response.status === 403) {
                        axios
                            .patch(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/register/${error.response.data.id}/`,
                                {
                                    'username': error.response.data.username,
                                    'email': error.response.data.email,
                                    'password': this.state.password,
                                    'id': error.response.data.id
                                }
                            )
                        this.setState({
                            'not_verify': true,
                            'email': error.response.data.email,
                            'username': error.response.data.username,
                            'id': error.response.data.id
                        });
                    }
                }
            })

    }

    clearInputPassword() {
        this.state.password = ''
    }

    handleSubmit(event) {
        this.getToken(this.state.email, this.state.password)
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    startTimer = (seconds) => {
        let p_timer = document.querySelector('#timer');
        let minute, second
        for (let i = seconds; i > 0; i--) {
            this.timer = setTimeout(() => {
                seconds -= 1
                minute = Math.floor(seconds / 60)
                second = seconds % 60
                this.setState({
                    'block_info_timer': `Превышен лимит попыток ввода пароля. До разблокировки 00:${[minute.toString().padStart(2, '0'),
                        second.toString().padStart(2, '0')].join(':')}`
                });
            }, (i + 1) * 1000)
        }
    }

    render() {
        if (localStorage.getItem('token')) return <Navigate
            to="/board_management"/>;
        else if (this.state.not_verify)
            return (<VerifyEmail email={this.state.email} id={this.state.id}
                                 username={this.state.username}
                                 password={this.state.password}/>)
        else
            return (
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

                                        {this.state.error_message &&
                                            <p className="input_error"
                                               ref={this.errorRef}>{this.state.error_message}</p>}
                                        {this.state.error_message_user &&
                                            <p className="input_error"
                                               ref={this.errorRef}>{this.state.error_message_user}</p>}

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
                                                    id='password'
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

                                    {this.state.block_info_timer &&
                                        <p className="input_error"
                                           id='timer'>{this.state.block_info_timer}</p>}
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
                    <Footer />
                </div>
            );
    };
}

export default Login;