import React from 'react'
import {Navigate, Link} from 'react-router-dom'
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
            <div className="board_header_toolbar_brush"
                 id='board_header_toolbar'
                 onClick={(e) => toolState.collapse(e)}>
                <Toolbar/>
            </div>
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
                <Link to="/">
                    <div className="header_logo"></div>
                </Link>

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
                            <Link className='header_link'
                                  to="/board_management">
                                <p className='header_link_p'>Главная</p>
                            </Link>
                            <Link className='header_link' to='/cabinet'>
                                <p className='header_link_p'>Профиль</p>
                            </Link>
                            <div className='header_link'
                                 onClick={(event) => this.props.logout()}>
                                <p className='header_link_p'>Выход из
                                    аккаунта</p>
                            </div>
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