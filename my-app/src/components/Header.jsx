import React from 'react'
import {Navigate, Link} from 'react-router-dom'
import '../styles/header.scss'



class Header extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        // if (!localStorage.getItem('token')) return <Navigate  to="/" />;
        return (
            <div className='header'>
                        <div className='right_text'>
                            <div className='username'>
                                bmeet
                            </div>
                            <div className="dropdown">
                                <button className="dropbtn"></button>
                                <div className='dropdown-content'>
                                <a className='a1' href="/board_management"><p className='p1'>Главная</p></a>
                                <a className='a2' href='/cabinet'><p className='p2'>Профиль</p></a>
                                <a className='a3' href="#" onClick={(event) => this.props.logout()}><p className='p3'>Выход из аккаунта</p></a>
                                </div>
                            </div>
                        </div>
        </div>
        )
    }
}

export default Header