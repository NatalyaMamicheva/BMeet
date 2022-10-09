import React from 'react'
import '../../styles/profile_style.scss'

class IsSaveInfo extends React.Component {

    render() {
        return (
            <form onSubmit={(event) => this.props.handleShowIsSave(event)}>
                <div className='issave'>
                    <div className='issave_title'>Ваши данные успешно сохранены
                    </div>
                    <button className='issave_close' type="submit" value="submit">
                    </button>
                </div>
            </form>
        )
    }
}

export default IsSaveInfo