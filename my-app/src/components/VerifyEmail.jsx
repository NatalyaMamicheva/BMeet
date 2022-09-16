import React from 'react'
import axios from 'axios'

class VerifyEmail extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            'error_message': ''
        }
    }

    handleClick(event) {
        event.preventDefault();
        axios
            .patch(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/register/${this.props.id}/`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                this.setState({'error_message': error.message});
                this.errorRef.current.focus();
            })
    }

    render() {
        return (
             <div>
                  <p ref={this.errorRef} >{this.state.error_message}</p>
                  <h2>Необходимо подтвердить вашу почту!</h2>
                  <p> Мы отправили письмо на ваш email - {this.props.email}</p>
                  <p> не пришло письмо?  -
                        <a href="#" onClick={(event) => this.handleClick(event)}> Отправить снова </a>
                  </p>
             </div>
        )
    }
}

export default VerifyEmail