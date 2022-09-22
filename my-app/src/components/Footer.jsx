import React from 'react';
import '../styles/auth_style.scss';


class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='footer'>
                <p>COPYRIGHT © 2022</p>
                <p className='footer_bmeet'>BMeet</p>
            </div>
        )
    }
}

export default Footer;