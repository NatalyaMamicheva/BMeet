import {Link} from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import VerifyEmail from "./VerifyEmail";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.email = '';
        this.id = null;
        this.username = '';
        this.password = '';
        this.state = {
            'username': '',
            'email': '',
            'password': '',
            'success': false,
            'error_message_username': '',
            'error_message_email': '',
            'error_message': ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/register/`,
                    {'username': this.state.username, 'email': this.state.email, 'password': this.state.password}
                  )
            .then(response => {
                this.email = response.data.email
                this.id = response.data.id
                this.username = response.data.username
                this.password = response.data.password
                console.log(response.data)
                this.setState({'username': '',
                               'email':'',
                               'password': '',
                               'success': true,
                               'error_message_username': '',
                               'error_message_email': '',
                               'error_message': ''
                               });
            })
            .catch(error => {
                this.setState({'error_message_username': '',
                               'error_message_email': '',
                               'error_message': ''
                               });
                if (!error.response.data)
                    this.setState({error_message: error.message});
                else{
                     if (error.response.data.email)
                            this.setState({error_message_email: error.response.data.email});
                     if (error.response.data.username)
                            this.setState({error_message_username: error.response.data.username});
                } ;
                this.errorRef.current.focus();
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        if (this.state.success){
            return(
                <VerifyEmail email={this.email} id={this.id} username={this.username} password={this.password}/>
            )
        }
        else {
            return (
                 <div>
                        <p ref={this.errorRef} >{this.state.error_message}</p>
                        <form onSubmit={(event) => this.handleSubmit(event)} >
                            <h1> Регистрация </h1>
                            <h3> username </h3>
                             <input type="text" name="username" id="username"
                                required onChange={(event) => this.handleChange(event)} value={this.state.username}
                             />
                             <p ref={this.errorRef} >{this.state.error_message_username}</p>
                             <h3> password </h3>
                             <input type="password" name="password" id="password"
                                required onChange={(event) => this.handleChange(event)} value={this.state.password}
                             />
                             <h3> email </h3>
                             <input type="email" name="email" id="email"
                                required onChange={(event) => this.handleChange(event)} value={this.state.email}
                             />
                             <p ref={this.errorRef} >{this.state.error_message_email}</p>
                             <button type="submit" value="submit">Регистрация</button>
                        </form>
                        <Link to='/'> Войти в аккаунт </Link>
                    </div>
            )
        }
    }
}

export default RegisterForm;