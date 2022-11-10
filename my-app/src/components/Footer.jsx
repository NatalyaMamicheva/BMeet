import React from 'react';
import '../styles/auth_style.scss';


class Footer extends React.Component {

    static date() {
        let date = new Date()
        return (
            date.toISOString().split('T')[0].split('-')[0]
        )
    }

    componentDidMount() {
        let url = window.location.pathname
        if (url === '/') {
            document.title = 'Добро пожаловать!'
        } else if (url === '/recpassword') {
            document.title = 'Восстановление пароля'
        } else if (url === '/register') {
            document.title = 'Регистрация'
        }
    }

    render() {
        return (
            <div className='footer'>
                <p>COPYRIGHT © {Footer.date()}</p>
                <p className='footer_bmeet'>                            
                    <span className='auth_yellow'>B</span>
                    <span className='auth_blue'>M</span>
                    <span className='auth_yellow'>ee</span>
                    <span className='auth_blue'>t</span>
                </p>
            </div>
        )
    }
}

export default Footer;
