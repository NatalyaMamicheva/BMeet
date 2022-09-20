import React from 'react'
import axios from 'axios'
import {Navigate, Link} from 'react-router-dom'


class Header extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        if (!localStorage.getItem('token')) return <Navigate  to="/" />;
        return (
             <div>
                  <a href="#" onClick={(event) => this.props.logout()}> Выход  </a>
                  <Link to='/board_management'>Доски  </Link>
                  <Link to='/cabinet'>Личный кабинет  </Link>
             </div>
        )
    }
}

export default Header