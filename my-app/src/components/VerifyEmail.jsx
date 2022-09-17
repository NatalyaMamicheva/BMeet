import React from 'react';
import axios from 'axios';
import '../styles/verify.scss';


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
                this.setState({'info_timer': `Повторная отправка возможна через ${second}`});
                if (second == 0){
                    this.setState({'info_timer': ''});
                    p_again.style["pointer-events"] = "auto";
                    p_again.style["color"] = "#E7B460";
                }
            }, (i + 1) * 1000)
        }
    }
    
    componentWillUnmount() {
        clearTimeout(this.timer); 
    }

    handleClick(event) {
        event.preventDefault();
        axios
            .patch(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/register/${this.props.id}/`,
             {'username': this.props.username, 'email': this.props.email, 'password': this.props.password, 'id': this.props.id}
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
             
            <div className='verify'>
                <div className='verify_form'>
                    <div className='logo'>
                            <span className='yellow'>B</span>
                            <span className='blue'>M</span>
                            <span className='yellow'>ee</span>
                            <span className='blue'>t</span>
                    </div>
                    <p className='err_p' ref={this.errorRef} >{this.state.error_message}</p>
                    <div className='your_mail'>
                        Необходимо подтвердить вашу почту!
                    </div>
                    <div className='in_eemail'>
                        Мы отправили письмо на ваш email -
                    </div>
                    <div className='send'> {this.props.email} ЗДЕСЬ БУДЕТ ПОЧТА</div>
                    <div className='head_mailll'>Не пришло письмо?</div>
                    <a href="#" id='again'  onClick={(event) => {this.handleClick(event); this.startTimer();}}> Отправить снова </a>
                    <p className='timerr'>{this.state.info_timer}</p>
                    
                </div>
            </div>
        )
    }
}

export default VerifyEmail;