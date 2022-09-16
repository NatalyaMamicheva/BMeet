import {Link} from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import VerifyEmail from "./VerifyEmail";
import "../styles/register.scss";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.email = '';
        this.id = null;
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
                <VerifyEmail email={this.email} id={this.id}/>
            )
        }
        else {
            return (
                <div className='register'>
                    <div className='register_form'>
                        <div className='logo'>
                            <span className='yellow'>B</span>
                            <span className='blue'>M</span>
                            <span className='yellow'>ee</span>
                            <span className='blue'>t</span>
                        </div>
                        <div className='hello'>
                            Приветствуем!
                        </div>
                        <div className='reg__in'>
                        <span>Зарегистрируйтесь, чтобы начать пользоваться<br/>платформой</span>
                        </div>
                        <p className='error_p' ref={this.errorRef} >{this.state.error_message}</p>
                        <form onSubmit={(event) => this.handleSubmit(event)} >
                        <div className='head_username'>
                            Username 
                        </div>
                        <input id='username' name='username' type="text" placeholder="bmeet" required
                        onChange={(event) => this.handleChange(event)} value={this.state.username}></input>
                        <p className='error_p' ref={this.errorRef} >{this.state.error_message_username}</p>
                        <div className='email_head'>
                            Email
                        </div>
                        <input id='email' type="email" name="email" placeholder="bmeet@gmail.com"
                            required onChange={(event) => this.handleChange(event)} value={this.state.email}/>
                        <p className='error_p' ref={this.errorRef} >{this.state.error_message_email}</p>
                        <div className='pass_head'>
                            Пароль
                        </div>
                        <input type="password" name="password" id="password" placeholder="************"
                            required onChange={(event) => this.handleChange(event)} value={this.state.password}/>
                        <button className='reg_reg' type="submit" value="submit"><p className='en'>Зарегистрироваться</p></button>
                        </form>
                        <div className='entrance'>У вас уже есть аккаунт?</div>
                        <Link className='entra' to='/'>Войти в аккаунт</Link>
                    </div>
                </div>

            )
        }
    }
}

export default RegisterForm;