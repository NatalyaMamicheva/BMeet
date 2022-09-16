import React from 'react'
import {useParams} from 'react-router-dom'
import { Navigate  } from 'react-router-dom';
import axios from 'axios'


class FromVerifyEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'email': this.props.params.email,
            'key': this.props.params.key,
            'token': '',
            'error_message': ''
        }
        localStorage.setItem('token', '');
    }

     componentDidMount() {
         axios
             .patch(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/verify/${this.state.email}/${this.state.key}/`)
             .then(response => {
                 this.setState({'token': response.data.token});
                 localStorage.setItem('token', response.data.token);
             })
             .catch(error => {
                 if (error.code=='ERR_BAD_REQUEST')
                     this.setState({'error_message': 'Неверная ссылка. Запросите повторную отправку верификационного письма'});
                 else
                     this.setState({'error_message': error.message});
                 this.errorRef.current.focus();
             })
     }

    render() {
        if (this.state.token) return <Navigate  to="/board_management" />;
        else return (
             <div>
                 <h1>{this.state.error_message}</h1>
             </div>
        )
    }
}


export default (props) => (
    <FromVerifyEmail
        {...props}
        params={useParams()}
    />
);