import React from 'react'


class IsSaveInfo extends React.Component {

    render() {
        return (
            <form className='profile_save_modal' onSubmit={(event) => this.props.handleShowIsSave(event)}>
                <div>
                    <button className='profile_save_button_close' type="submit" value="submit">
                        <div className="profile_save_close"></div>
                    </button>
                </div>
                <div className="profile_save_text">
                        <p>Ваши данные успешно сохранены</p>
                    </div>
            </form>
        )
    }
}

export default IsSaveInfo