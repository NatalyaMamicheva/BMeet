import React from 'react';
import axios from 'axios';
import '../styles/auth_style.scss';


class VerifyEmail extends React.Component {
    timer;

    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            'error_message': '',
            'info_timer': '',
        }
    }

    startTimer = () => {
        let p_again = document.querySelector('#again');
        p_again.style["pointer-events"] = "none";
        p_again.style["color"] = "#6E6B7B";
        let second = 60;
        for (let i = 60; i > 0; i--) {
            this.timer = setTimeout(() => {
                second -= 1
                this.setState({'info_timer': `Повторная отправка возможна через ${second} сек.`});
                if (second === 0) {
                    this.setState({'info_timer': ''});
                    p_again.style["pointer-events"] = "auto";
                    p_again.style["color"] = "#E7B460";
                }
            }, (i + 1) * 1000)
        }
    }

    // componentWillUnmount() {
    //     clearTimeout(this.timer);
    // }

    handleClick(event) {
        event.preventDefault();
        axios
            .patch(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/register/${this.props.id}/`,
                {
                    'username': this.props.username,
                    'email': this.props.email,
                    'password': this.props.password,
                    'id': this.props.id
                }
            )
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                this.setState({'error_message': error.message});
                this.errorRef.current.focus();
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
                        {/*<p className='err_p'*/}
                        {/*   ref={this.errorRef}>{this.state.error_message}</p>*/}
                        <div className='auth_content'>
                            <div className='auth_title'>
                                <p>Необходимо подтвердить вашу почту!</p>
                                <span>Мы отправили письмо на ваш email -</span>
                            </div>
                            <div className='auth_input'>
                                <div
                                    className='auth_title_verify auth_title_input'>
                                    <span>{this.props.email}</span>
                                </div>
                            </div>
                            <p className='auth_timer'>{this.state.info_timer}</p>
                            <div className='auth_header'>
                                <p className='auth_header_p'>
                                    Не пришло письмо?</p>
                                <a href="#" className='auth_header_a'
                                   id='again' onClick={(event) => {
                                    this.handleClick(event);
                                    this.startTimer();
                                }}> Отправить снова </a>
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


export default VerifyEmail;

