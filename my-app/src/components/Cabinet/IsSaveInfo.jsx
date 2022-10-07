import React from 'react'


class IsSaveInfo extends React.Component {

    render() {
        return (
            <form onSubmit={(event) => this.props.handleShowIsSave(event)}>
                <p>Данные успешно сохранены</p>
                <div>
                    <button type="submit" value="submit">Закрыть
                    </button>
                </div>
            </form>
        )
    }
}

export default IsSaveInfo