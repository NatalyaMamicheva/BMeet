import React from 'react'
import axios from 'axios'
import Header from './Header.jsx'
import {Navigate, Link} from 'react-router-dom'


class CreateBoard extends React.Component {
    constructor(props) {
        super(props)
         this.state = {
            'name':'',
            'description':'',
            'group':'',
            'error_message':''
         };
         this.errorRef = React.createRef();
    }

    handleCreateSubmit(event) {
        let headers = this.props.getHeader()
        let group = []

        for (let email of this.state.group.split(' ')) {
            group.push({'email': email});
        }

        let data = {'name':this.state.name, 'description': this.state.description, 'group':group}
        axios.request({
            url: `http://${process.env.REACT_APP_BACKEND_HOST}/api/board/`,
            method: "post",
            headers: headers,
            data: data
        })
        .then(response => {
            this.setState({'error_message': '' });
            this.props.handleShowCreateBoard(event)
        })
        .catch(error => {
            if (error.code == 'ERR_BAD_REQUEST') this.setState({'error_message': 'Проверьте правильность введеных email' });
            else this.setState({'error_message': error.message });
        })
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
           <form onSubmit={(event) => this.handleCreateSubmit(event)} >
              <p className='error_p' ref={this.errorRef} >{this.state.error_message}</p>
              <button onClick={(event) =>  this.props.handleShowCreateBoard(event)}> X </button>
              <h3>Название доски</h3>
              <input name="name" type="text" required
                    onChange={(event) => this.handleChange(event)} value={this.state.name}></input>
              <h3>Описание</h3>
              <textarea name="description"
                    onChange={(event) => this.handleChange(event)} value={this.state.description}></textarea>
              <h3>Пригласить коллег</h3>
              <input name="group" type="text"
                    onChange={(event) => this.handleChange(event)} value={this.state.group}></input>
              <button type="submit" value="submit"> Сохранить </button>
          </form>
        )
    }
}

export default CreateBoard