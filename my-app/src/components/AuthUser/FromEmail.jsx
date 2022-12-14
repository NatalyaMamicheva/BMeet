import React from 'react'
import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import axios from 'axios'


class FromEmail extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            'email': this.props.params.email,
            'key': this.props.params.key,
            'action': this.props.params.action,
            'token': '',
            'error_message': ''
        }
        localStorage.setItem('token', '');
        localStorage.setItem('username', '');
        localStorage.setItem('email', '');
    }

    componentDidMount() {
        axios
            .patch(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/${this.state.action}/${this.state.email}/${this.state.key}/`)
            .then(response => {
                this.setState({ 'token': response.data.token });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
            })
            .catch(error => {
                if (error.code == 'ERR_BAD_REQUEST')
                    this.setState({ 'error_message': 'Неверная ссылка. Запросите повторную отправку письма' });
                else
                    this.setState({ 'error_message': error.message });
                this.errorRef.current.focus();
            })
    }

    render() {
        if (this.state.token) return <Navigate to="/board_management" />;
        else return (
            <div>
                {this.state.error_message &&
                    <p className="error_p" ref={this.errorRef}>{this.state.error_message}</p>}
            </div>
        )
    }
}


export default (props) => (
    <FromEmail
        {...props}
        params={useParams()}
    />
);