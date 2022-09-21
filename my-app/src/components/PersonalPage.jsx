import React from 'react'
import axios from 'axios'
import {Navigate, Link} from 'react-router-dom'
import Header from './Header.jsx'


class PersonalPage extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            'username': '',
            'start_username': '',
            'email': '',
            'start_email': '',
            'password': '',
            'first_name': '',
            'start_first_name': '',
            'last_name': '',
            'start_last_name': '',
            'error_message': ''
        };

    }

    componentDidMount() {
        let headers = this.props.getHeader()
        axios
            .get(`http://${process.env.REACT_APP_BACKEND_HOST}/api/profile/${localStorage.getItem('username')}/`,
                   {headers})
            .then(response => {
                this.setState({'username': response.data.username,
                               'start_username': response.data.username,
                               'email':response.data.email,
                               'start_email':response.data.email,
                               'first_name': response.data.first_name,
                               'start_first_name':response.data.first_name,
                               'last_name': response.data.last_name,
                               'start_last_name':response.data.last_name
                               });
            })
            .catch(error => {
               this.setState({'error_message': error.message });
            })
    }

    handleSubmit(event) {
        let headers = this.props.getHeader()
        let data = {}
        if (this.state.username !== this.state.start_username) data['username'] = this.state.username
        if (this.state.email !== this.state.start_email) data['email'] = this.state.email
        if (this.state.password !== '') data['password'] = this.state.password
        if (this.state.first_name !== this.state.start_first_name) data['first_name'] = this.state.first_name
        if (this.state.last_name !== this.state.start_last_name) data['last_name'] = this.state.last_name

        axios.request({
            url: `http://${process.env.REACT_APP_BACKEND_HOST}/api/profile/${localStorage.getItem('username')}/`,
            method: "patch",
            headers: headers,
            data: data
        })
        .then(response => {
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('email', response.data.email)
        })
        .catch(error => {
            this.setState({'error_message': error.message });
        })
    }

    handleCancel(event){
        event.preventDefault()
        this.setState({'username': this.state.start_username,
                       'email':this.state.start_email,
                       'first_name': this.state.start_first_name,
                       'last_name': this.state.start_last_name
                       });
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
                   <h1> Личный кабинет {localStorage.getItem('username') }</h1>
                   <p className='error_p' ref={this.errorRef} >{this.state.error_message}</p>
                   <form onSubmit={(event) => this.handleSubmit(event)} >
                        <h3>username</h3>
                        <input name='username' type="text" placeholder="username"
                        onChange={(event) => this.handleChange(event)} value={this.state.username}></input>
                        <h3>email</h3>
                        <input  type="email" name="email" placeholder="email"
                            onChange={(event) => this.handleChange(event)} value={this.state.email}/>
                        <h3>password</h3>
                        <input type="password" name="password"  placeholder="password"
                             onChange={(event) => this.handleChange(event)} value={this.state.password}/>
                        <h3>first_name</h3>
                        <input type="first_name" name="first_name"  placeholder="first_name"
                             onChange={(event) => this.handleChange(event)} value={this.state.first_name}/>
                         <h3>last_name</h3>
                         <input type="last_name" name="last_name" placeholder="last_name"
                             onChange={(event) => this.handleChange(event)} value={this.state.last_name}/>
                         <h3></h3>
                        <button type="submit" value="submit"> Сохранить </button>
                        <h3></h3>
                        <button onClick={(event) => this.handleCancel(event)}>Отменить</button>
                    </form>
             </div>
        )
    }
}

export default PersonalPage