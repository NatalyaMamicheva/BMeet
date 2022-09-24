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
        localStorage.setItem('email', '')
    }

     componentDidMount() {
        console.log(this.state.new_email, this.state.old_email)
         axios
             .patch(`http://${process.env.REACT_APP_BACKEND_HOST}/api/profile/${this.state.old_email}/${this.state.new_email}/${this.state.key}/`)
             .then(response => {
                 localStorage.setItem('email', response.data.email);
             })
             .catch(error => {
                console.log(error)
                 if (error.code=='ERR_BAD_REQUEST')
                     this.setState({'error_message': 'Неверная ссылка. Запросите повторную отправку письма'});
                 else
                     this.setState({'error_message': error.message});
             })
     }

    render() {
        if (!this.state.error_message) return <Navigate  to="/cabinet" />;
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