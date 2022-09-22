import React from 'react'
import axios from 'axios'
import Header from './Header.jsx'
import '../styles/user.scss'


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
            'error_message': '',
            'readOnly': true,
            'class_open': 'close_pass',
            
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
                               'start_last_name':response.data.last_name,
                               

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
    
    state_close(event){
        event.preventDefault()
        this.b_open = document.querySelector('#one');
        this.setState({'readOnly': false, 'class_open': 'open_pass'})
    }

    state_open(event){
        event.preventDefault()
        this.b_open = document.querySelector('#one');
        this.setState({'readOnly': true, 'class_open': 'close_pass'})
    }
    
    _click(event){
        event.preventDefault()
        // this.b_open = document.querySelector('#one');
        if (this.state['readOnly'] === true){
            this.state_close(event);
        }
        if (this.state['readOnly'] === false){
            this.state_open(event);
        }

     }

    render() {
        return (
            
            <div className='user'>
                <Header logout={() => this.props.logout()}/>
                <div className='card_user'>
                    <div className='title' > Профиль {localStorage.getItem('username') }</div>
                    <p className='error_p' ref={this.errorRef} >{this.state.error_message}</p>
                    <div className='logo_user'></div>
                    <form onSubmit={(event) => this.handleSubmit(event)} >
                        <div className="title_name">Username</div>
                        <input name='username' className='title_input' type="text" placeholder="bmeet" 
                        onChange={(event) => this.handleChange(event)} value={this.state.username}></input>
                        <div className='mail_e'>Email</div>
                        <input type="email" className='mail_input' name="email"  placeholder="bmeet@gmail.com" 
                        onChange={(event) => this.handleChange(event)} value={this.state.email}/>
                        <div className='passw'>Пароль</div>
                        <input type="password" name="password" readOnly={this.state['readOnly']} className='passw_input' placeholder="**********" 
                        onChange={(event) => this.handleChange(event)} value={this.state.password}/>
                        <button id='one' className={this.state['class_open']}  
                        onClick={(event) => {this._click(event); }}></button>
                        <div className='last'>Фамилия</div>
                        <input type="last_name"name="last_name" className="last_name" placeholder="Введите фамилию" 
                        onChange={(event) => this.handleChange(event)} value={this.state.last_name}/>
                        <div className='first'>Имя</div>
                        <input type="first_name" name="first_name" className="first_name"  placeholder="Введите имя"
                        onChange={(event) => this.handleChange(event)} value={this.state.first_name}/>
                        <button className='save' type="submit" value="submit"> Сохранить </button>
                        <button className='cancel' onClick={(event) => this.handleCancel(event)}>Отменить</button>
                    </form>
                </div>
             </div>
        )
    }
}

export default PersonalPage