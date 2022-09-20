import React from 'react'
import axios from 'axios'
import {Navigate, Link} from 'react-router-dom'
import Header from './Header.jsx'


class PersonalPage extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
             <div>
                  <Header logout={() => this.props.logout()}/>
                   <h1> Личный кабинет {localStorage.getItem('username') }</h1>
             </div>
        )
    }
}

export default PersonalPage