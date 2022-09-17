import React from 'react'
import axios from 'axios'
import {Navigate} from 'react-router-dom'


class BoardManagement extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        if (!localStorage.getItem('token')) return <Navigate  to="/" />;
        return (
             <div>
                  <button onClick={()=>this.props.logout()}> Выход </button>
                  <h1>Доски {localStorage.getItem('username') }</h1>
             </div>
        )
    }
}

export default BoardManagement