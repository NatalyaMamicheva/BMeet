import React from 'react'
import axios from 'axios'
import Header from '../Header.jsx'
import '../../styles/profile_style.scss'
import '../../styles/auth_style.scss'
import Footer from "../Footer";


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
            'readOnly': true,
            'class_open': 'profile_close_pass',
            'error_message': '',
            'error_message_username': '',
            'error_message_email': '',
            'message_change_email': ''
        };
    }

    componentDidMount() {
        this.setState({
            'error_message': '',
            'error_message_username': '',
            'error_message_email': '',
        })
        let headers = this.props.getHeader()
        axios
            .get(`http://${process.env.REACT_APP_BACKEND_HOST}/api/profile/${localStorage.getItem('username')}/`,
                { headers })
            .then(response => {
                this.setState({
                    'username': response.data.username,
                    'start_username': response.data.username,
                    'email': response.data.email,
                    'start_email': response.data.email,
                    'first_name': response.data.first_name,
                    'start_first_name': response.data.first_name,
                    'last_name': response.data.last_name,
                    'start_last_name': response.data.last_name
                })

            })
            .catch(error => {
                this.setState({ 'error_message': error.message })
                if (error.response.status === 401) {
                    this.props.logout()
                }
                this.errorRef.current.focus();
            })
    }

    handleSubmit(event) {
        event.preventDefault();
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
                localStorage.setItem('token', response.data.token)
                if (this.state.email !== this.state.start_email)
                    this.setState({ message_change_email: `На почту ${this.state.email} отправлено письмо с инструкцией по смене email` });
                this.componentDidMount()
            })
            .catch(error => {
                this.setState({
                    'error_message_username': '',
                    'error_message_email': '',
                    'error_message': ''
                });
                if (!error.response.data)
                    this.setState({ error_message: error.message });
                else {
                    if (error.response.data.email)
                        this.setState({ error_message_email: error.response.data.email });
                    if (error.response.data.username)
                        this.setState({ error_message_username: error.response.data.username });
                }
            })
    }

    handleCancel(event) {
        this.setState({
            'error_message': '',
            'error_message_username': '',
            'error_message_email': '',
        })
        event.preventDefault()
        this.setState({
            'username': this.state.start_username,
            'email': this.state.start_email,
            'first_name': this.state.start_first_name,
            'last_name': this.state.start_last_name,
            'password': ''
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    state_close(event) {
        event.preventDefault()
        this.b_open = document.querySelector('#one');
        this.setState({ 'readOnly': false, 'class_open': 'profile_open_pass' })
    }

    state_open(event) {
        event.preventDefault()
        this.b_open = document.querySelector('#one');
        this.setState({ 'readOnly': true, 'class_open': 'profile_close_pass' })
    }

    _click(event) {
        event.preventDefault()
        // this.b_open = document.querySelector('#one');
        if (this.state['readOnly'] === true) {
            this.state_close(event);
        }
        if (this.state['readOnly'] === false) {
            this.state_open(event);
        }

    }

    render() {
        return (

            <div className='profile'>
                <Header logout={() => this.props.logout()} />
                <div className='profile_card'>
                    <div className='profile_title'>
                        <p>Профиль {localStorage.getItem('username')}</p>
                        <div className='profile_avatar'></div>
                    </div>
                    {this.state.error_message &&
                        <p className="error_p" ref={this.errorRef}>{this.state.error_message}</p>}
                    <div className='profile_form'>
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <div className='profile_title_input'>
                                <div className='profile_input'>
                                    <div className='profile_title_input_name'>
                                        <span>Username</span>
                                    </div>
                                    <div className='profile_input_border'>
                                        <label>
                                            <input name='username'
                                                className='profile_input_text'
                                                type="text"
                                                placeholder="bmeet"
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.username}></input>
                                        </label>
                                    </div>
                                    <p className='error_p'>{this.state.error_message_username}</p>
                                </div>

                                <div className='profile_input'>
                                    <div className='profile_title_input_name'>
                                        <span>Email</span>
                                    </div>
                                    <div className='profile_input_border'>
                                        <label>
                                            <input type="email"
                                                className='profile_input_text'
                                                name="email"
                                                placeholder="bmeet@gmail.com"
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.email} />
                                        </label>
                                    </div>
                                    <p className='error_p'>{this.state.error_message_email}</p>
                                    <p className='error_p'>{this.state.message_change_email}</p>
                                </div>

                                <div className='profile_input'>
                                    <div className='profile_title_input_name'>
                                        <span>Фамилия</span>
                                    </div>
                                    <div className='profile_input_border'>
                                        <label>
                                            <input type="text"
                                                name="last_name"
                                                className="profile_input_text"
                                                placeholder="Введите фамилию"
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.last_name} />
                                        </label>
                                    </div>
                                </div>

                                <div className='profile_input'>
                                    <div className='profile_title_input_name'>
                                        <span>Имя</span>
                                    </div>
                                    <div className='profile_input_border'>
                                        <label>
                                            <input type="text"
                                                name="first_name"
                                                className="profile_input_text"
                                                placeholder="Введите имя"
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.first_name} />
                                        </label>
                                    </div>
                                </div>

                                <div className='profile_input'>
                                    <div className='profile_title_input_name'>
                                        <span>Пароль</span>
                                    </div>
                                    <div className='profile_input_border'>
                                        <label>
                                            <div className='profile_psw'>
                                                <div className='profile_close'>
                                                    <input type="password"
                                                        name="password"
                                                        readOnly={this.state['readOnly']}
                                                        className='profile_input_text'
                                                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.password} />
                                                </div>
                                                <div>
                                                    <input type='button'
                                                        id='one'
                                                        className={this.state['class_open']}
                                                        onClick={(event) => {
                                                            this._click(event);
                                                        }} />
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='profile_buttons'>
                                <button className='profile_save' type="submit"
                                    value="submit"> Сохранить
                                </button>
                                <button className='profile_cancel'
                                    onClick={(event) => this.handleCancel(event)}>Отменить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default PersonalPage