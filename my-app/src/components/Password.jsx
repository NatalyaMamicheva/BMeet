import {Link} from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import "../styles/auth_style.scss";


class Password extends React.Component {
    timer;

    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            'email': '',
            'error_message': '',
            'info_timer': ''
        }
    }

    startTimer = () => {
        let p_again = document.querySelector('#button');
        p_again.style["pointer-events"] = "none";
        p_again.style["color"] = "#6E6B7B";
        p_again.style["background"] = "#B9B9C3";
        let second = 60;
        for (let i = 60; i > 0; i--) {
            this.timer = setTimeout(() => {
                second -= 1
                this.setState({'info_timer': `Повторный запрос возможен через ${second}`});
                if (second === 0) {
                    this.setState({'info_timer': ''});
                    p_again.style["pointer-events"] = "auto";
                    p_again.style["color"] = "#E7B460";
                    p_again.style["background"] = "#E7B460";
                }
            }, (i + 1) * 1000)
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }


    handleSubmit(event) {
        axios
            .patch(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/recovery/${this.state.email}/`,
                {'email': this.props.email}
            )
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                this.setState({'error_message': error.response.data["Invalid"]});
                this.errorRef.current.focus();
            })
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
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
                            {/*<p className='err_p' ref={this.errorRef} >{this.state.error_message}</p>*/}
                            <div className='auth_title'>
                                <p>Забыли пароль?</p>
                                <span>Пожалуйста, введите ваш email и следуйте инструкции в письме</span>
                            </div>
                            <div className='auth_form'>
                                <form onSubmit={(event) => {
                                    this.handleSubmit(event);
                                    this.startTimer();
                                }}>
                                    <div className='auth_input'>

                                        <div className='auth_title_input'>
                                            <span>Email</span>
                                        </div>
                                        <div className='auth_input_border'>
                                            <label>
                                                <input
                                                    className='auth_input_text'
                                                    type="email"
                                                    placeholder="bmeet@gmail.com"
                                                    name="email" required
                                                    onChange={(event) => this.handleChange(event)}
                                                    value={this.state.email}>
                                                </input>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='auth_input_button'>
                                        <button type='submit'
                                                className='auth_button_form'>
                                            <p>Сбросить
                                                пароль</p>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className='auth_header'>
                                <p></p>
                                <Link className='auth_header_a' to='/'> &lt; Авторизоваться </Link>
                                <p className='auth_header_p'>{this.state.info_timer}
                                    </p>
                        </div>
                    </div>
                </div>
                </div>

                <div className='footer'>
                    <p>COPYRIGHT © 2022</p>
                    <p className='footer_bmeet'>BMeet</p>
                </div>
            </div>

            // <p className='timerr'>{this.state.info_timer}</p>
            // <Link className='log_in' to='/'> &lt; Авторизоваться </Link>
        )
    }
}

export default Password;