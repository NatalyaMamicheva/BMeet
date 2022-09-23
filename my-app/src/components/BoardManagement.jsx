import React from 'react'
import axios from 'axios'
import Header from './Header.jsx'
import CreateBoard from './CreateBoard.jsx'
import {Navigate, Link} from 'react-router-dom'


class BoardManagement extends React.Component {
    constructor(props) {
        super(props)
         this.state = {
             isOpenCreate: false
         };
    }

    handleShowCreateBoard(event){
        this.setState({ isOpenCreate: !this.state.isOpenCreate });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
             <div>
                  <Header logout={() => this.props.logout()}/>
                  <button  onClick={(event) => this.handleShowCreateBoard(event)}>Создать доску</button>
                  <React.Fragment>
                        {this.state.isOpenCreate && (<CreateBoard getHeader={() => this.props.getHeader()} handleShowCreateBoard={() => this.handleShowCreateBoard()} />)}
                  </React.Fragment>
             </div>
        )
    }
}

export default BoardManagement