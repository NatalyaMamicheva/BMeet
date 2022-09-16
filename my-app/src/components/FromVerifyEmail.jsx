import React from 'react'
import {useParams, Link} from 'react-router-dom'
import { Navigate  } from 'react-router-dom';
import axios from 'axios'

import "../styles/verify.scss";


class FromVerifyEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'email': this.props.params.email,
            'key': this.props.params.key,
            'token': '',
            'error_message': ''
        }
        localStorage.setItem('token', '');
    }

     componentDidMount() {
         axios
             .patch(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/verify/${this.state.email}/${this.state.key}/`)
             .then(response => {
                 this.setState({'token': response.data.token});
                 localStorage.setItem('token', response.data.token);
             })
             .catch(error => {
                 if (error.code=='ERR_BAD_REQUEST')
                     this.setState({'error_message': 'Неверная ссылка. Запросите повторную отправку верификационного письма'});
                 else
                     this.setState({'error_message': error.message});
                 this.errorRef.current.focus();
             })
     }

    render() {
        if (this.state.token) return <div className='verify'>
            <div className='verify_form'>
                <div className='logo'>
                        <span className='yellow'>B</span>
                        <span className='blue'>M</span>
                        <span className='yellow'>ee</span>
                        <span className='blue'>t</span>
                </div>
                <div className='your_mail'>
                    Необходимо подтвердить вашу почту!
                </div>
                <div className='in_eemail'>
                    Мы отправили письмо на ваш email -
                </div>
                <div className='send'>
                <Navigate  to="/board_management" /></div>
                <div className='head_reg'>Не пришло письмо?</div>
                <Link className='reg' to='/register'>Отправить снова</Link>
            </div>
        </div>
            
        else return (
            <div className='verify'>
                <div className='verify_form'>
                    <div className='logo'>
                        <span className='yellow'>B</span>
                        <span className='blue'>M</span>
                        <span className='yellow'>ee</span>
                        <span className='blue'>t</span>
                    </div>
                    <div className='your_mail'>
                        Необходимо подтвердить вашу почту!
                    </div>
                    <div className='in_eemail'>
                        Мы отправили письмо на ваш email -
                    </div>
                    <div className='send'>
                        {this.state.error_message}
                    </div>
                    <div className='head_mailll'>Не пришло письмо?</div>
                    <Link className='again' to='#'>Отправить снова</Link>
                 </div>
             </div>
        )
    }
}


export default (props) => (
    <FromVerifyEmail
        {...props}
        params={useParams()}
    />
);