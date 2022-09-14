import React from 'react'

class VerifyEmail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
             <div>
                  <h1> Привет {this.props.email} {this.props.id}</h1>
             </div>
        )
    }
}

export default VerifyEmail