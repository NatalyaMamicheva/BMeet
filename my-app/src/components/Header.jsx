import React from 'react'
import {Navigate} from 'react-router-dom'
import '../styles/app.scss'
import '../styles/header_style.scss'


class Header extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        // if (!localStorage.getItem('token')) return <Navigate  to="/" />;
        return (
            <div className='header'>
                <div className='header_dropdown'>
                    <div className='header_content'>
                        <div className='header_p'>
                            <p className='header_username'>{localStorage.getItem('username')}</p>
                        </div>
                        <div className='header_avatar'></div>
                    </div>
                    <div className='header_menu'>
                        <div className='header_links'>
                            <a className='header_link'
                               href="/board_management">
                                <p className='header_link_p'>Главная</p>
                            </a>
                            <a className='header_link' href='/cabinet'>
                                <p className='header_link_p'>Профиль</p>
                            </a>
                            <a className='header_link' href="#"
                               onClick={(event) => this.props.logout()}>
                                <p className='header_link_p'>Выход из
                                    аккаунта</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header