import React from 'react'
import axios from 'axios'
import Header from './Header.jsx'
import {Navigate, Link} from 'react-router-dom'


class BoardManagement extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
             <div>
                  <Header logout={() => this.props.logout()}/>
                  <h1> Доски {localStorage.getItem('username')}</h1>
                  
             </div>
        )
    }
}

export default BoardManagement