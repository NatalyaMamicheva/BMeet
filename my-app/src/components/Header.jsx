import React from 'react'
import {Navigate} from 'react-router-dom'
import '../styles/app_style.scss'
import '../styles/header_style.scss'
import axios from "axios";
import Toolbar from "./Board/Toolbar";
import toolState from "./Board/store/toolState";


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board_name: '',
            toolbar: null
        }
    }

    get_toolbar() {
        return (
            <a href="#">
                <div className="board_header_toolbar_brush"
                     id='board_header_toolbar'
                     onClick={(e) => toolState.collapse(e)}>
                    <Toolbar/>
                </div>
            </a>
        )
    }

    componentDidMount() {
        let url = window.location.pathname
        if (url === '/board_management') {
            document.title = 'Мои доски'
        } else if (url === '/cabinet') {
            document.title = 'Профиль'
        }
    }

    render() {
        if (!localStorage.getItem('token')) return <Navigate to="/"/>;
        let pathname = window.location.pathname
        if (pathname.split('/')[1] === 'board' && this.state.board_name === '') {
            this.getBoardName(pathname)
            this.toolbar = this.get_toolbar()
        }
        return (
            <div className='header'>
                <a href="/">
                    <div className="header_logo"></div>
                </a>

                {this.toolbar}

                <div className='header_name_board'>
                    <p>{this.state.board_name}</p>
                </div>
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

    getBoardName(pathname) {
        let url = `http://${process.env.REACT_APP_BACKEND_HOST}/api${pathname}`
        let headers = this.props.getHeader()
        axios.request({
            url: url,
            method: 'get',
            headers: headers,
        })
            .then(response => {
                this.setState({board_name: response.data.name})
            })
        return this.state.board_name
    }
}

export default Header