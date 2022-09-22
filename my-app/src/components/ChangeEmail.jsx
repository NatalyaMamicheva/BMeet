import React from 'react'
import {useParams} from 'react-router-dom'
import { Navigate  } from 'react-router-dom';
import axios from 'axios'


class ChangeEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'new_email': this.props.params.new_email,
            'old_email': this.props.params.old_email,
            'key': this.props.params.key,
            'error_message': ''
        }
        localStorage.setItem('token', '');
        localStorage.setItem('email', '');
        localStorage.setItem('username', '');
    }

     componentDidMount() {
         axios
             .patch(`http://${process.env.REACT_APP_BACKEND_HOST}/api/profile/
                ${this.state.old_email}/${this.state.new_email}/${this.state.key}/`)
             .then(response => {
                 this.setState({'token': response.data.token});
                 localStorage.setItem('token', response.data.token);
                 localStorage.setItem('username', response.data.username);
                 localStorage.setItem('email', response.data.email);
             })
             .catch(error => {
                 if (error.code=='ERR_BAD_REQUEST')
                     this.setState({'error_message': 'Неверная ссылка. Запросите повторную отправку письма'});
                 else
                     this.setState({'error_message': error.message});
                 this.errorRef.current.focus();
             })
     }

    render() {
        if (localStorage.getItem('token')) return <Navigate  to="/cabinet" />;
        else return (
             <div>
                 <h1>{this.state.error_message}</h1>
             </div>
        )
    }
}


export default (props) => (
    <ChangeEmail
        {...props}
        params={useParams()}
    />
);