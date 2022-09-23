import React from 'react';
import '../styles/auth_style.scss';


class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    static date () {
        let date = new Date()
        return (
            date.toISOString().split('T')[0].split('-')[0]
        )
    }

    render() {
        return (
            <div className='footer'>
                <p>COPYRIGHT © {Footer.date()}</p>
                <p className='footer_bmeet'>BMeet</p>
            </div>
        )
    }
}

export default Footer;
