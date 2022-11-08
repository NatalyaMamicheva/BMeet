import React from 'react';
import axios from 'axios';
import '../../styles/auth_style.scss';
import Footer from "../Footer";
import { Link } from "react-router-dom";


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
                this.setState({ 'info_timer': `Повторная отправка возможна через ${second} сек.` });
                if (second === 0) {
                    this.setState({ 'info_timer': '' });
                    p_again.style["pointer-events"] = "auto";
                    p_again.style["color"] = "#E7B460";
                }
            }, (i + 1) * 1000)
        }
    }


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
                this.setState({ 'error_message': error.message });
                this.errorRef.current.focus();
            })
    }

    render() {
        return (
            <div className='auth'>
                <div className='grow'>
                <div className='auth_form_table'>
                    <div className='auth_logo'>
                        <span className='auth_yellow'>B</span>
                        <span className='auth_blue'>M</span>
                        <span className='auth_yellow'>ee</span>
                        <span className='auth_blue'>t</span>
                    </div>
                    {this.state.error_message &&
                        <p className="input_error" ref={this.errorRef}>{this.state.error_message}</p>}
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
                            <Link to={'#'} className='auth_header_a' id='again'
                                    onClick={(event) => {
                                    this.handleClick(event);
                                    this.startTimer();
                                }}> Отправить снова
                            </Link>
                        </div>
                    </div>
                </div>
                </div>
                <Footer />
            </div>

        )
    }
}


export default VerifyEmail;

