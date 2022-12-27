import React from "react";

class VkontakteLogin extends React.Component {
    constructor(props) {
        super(props)
        this.url_vk = process.env.VK_AUTH
        this.redirect_uri = process.env.APP_HOST
        this.client_id = process.env.VK_CLIENT_ID
        // this.auth_vk = `${this.url_vk}?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=token&scope=email`
        this.auth_vk = `https://oauth.vk.com/authorize?client_id=51509523&redirect_uri=localhost&response_type=token&scope=email`
    }

    render() {
        return (
            <div className="auth_social">
                <a className='auth_button_social' href={this.auth_vk}>
                    vk
                </a>
            </div>
        )
    }
}

export default VkontakteLogin;
