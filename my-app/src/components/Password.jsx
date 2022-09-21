import {Link} from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import "../styles/password.scss";


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
                if (second == 0){
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
        console.log(this.state.email)
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
        return(
            <div className='password'>
                <div className='password_form'>
                    <div className='logo'>
                            <span className='yellow'>B</span>
                            <span className='blue'>M</span>
                            <span className='yellow'>ee</span>
                            <span className='blue'>t</span>
                    </div>
                    <p className='err_p' ref={this.errorRef} >{this.state.error_message}</p>
                    <div className='forgot_pass'>
                        Забыли пароль?
                    </div>
                    <div className='in_mail'>
                        Пожалуйста, введите ваш email и следуйте инструкции в письме
                    </div>
                <form onSubmit={(event) => {this.handleSubmit(event); this.startTimer();}}>
                    <div className='head_emaill'>
                        Email
                    </div>
                    <input className='input_class_emaill' type="email" placeholder="bmeet@gmail.com" name="email" required
                        onChange={(event) => this.handleChange(event)} value={this.state.email}>
                    </input>
                    <button type='submit' className='pass_in' id='button'> <p className='en'>Сбросить пароль</p>
                    </button>
                </form>
                <p className='timerr'>{this.state.info_timer}</p>
                <Link className='log_in' to='/'> &lt; Авторизоваться </Link>
                </div>
            </div>
        )
    }
}

export default Password;