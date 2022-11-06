import React from 'react'
import axios from 'axios'
import CreateUpdateBoard from './CreateUpdateBoard.jsx'
import '../../styles/boards_style.scss'


class BoardItem extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            isOpenUpdate: false,
            error_message: ''
        }
    }


    handleShowUpdateBoard() {
        this.setState({isOpenUpdate: !this.state.isOpenUpdate});
    }

    static DeleteModal(event) {
        console.log(`#${event.target.id}`)
        let modal = document.querySelector(`#${event.target.id}`)
        console.log(modal.style['display'])
        if (modal.style['display'] === '') {
            modal.style['display'] = 'flex'
        } else {
            modal.style['display'] = null
        }
    }

    DeleteBoard() {
        let headers = this.props.getHeader()
        axios.request({
            url: `http://${process.env.REACT_APP_BACKEND_HOST}/api/board/delete/${this.props.item.id}/`,
            method: 'delete',
            headers: headers,
        })
            .then(response => {
                this.setState({'error_message': ''});
                this.props.isReload()
            })
            .catch(error => {
                this.setState({'error_message': error.message})
                if (error.response.status === 401) {
                    this.props.logout()
                }
                this.errorRef.current.focus();
            })
    }

    render() {
        let author = this.props.item.author.username
        let user = localStorage.getItem('username')
        let update = false
        if (author === user) {
            update = true
        }
        let board_open = '/board/' + this.props.item.id
        return (
            <div id={this.props.item.id} className='boards_board'>
                <div className="boards_delete_content boards_delete_display"
                     id={`board_${this.props.item.id}`}>
                    <div className="boards_delete_window">
                        <div className="boards_delete_close">
                            <div className="boards_delete_close_button"
                                 id={`board_${this.props.item.id}`}
                                 onClick={(event) => BoardItem.DeleteModal(event)}></div>
                        </div>
                        <div className="boards_delete_text">
                            <div className="boards_delete_title">
                                <p>Удаление доски</p>
                            </div>
                            <div className="boards_delete_quest">
                                <p>Вы уверены, что хотите удалить доску?</p>
                            </div>
                        </div>
                        <div className="boards_delete_buttons">
                            <button className='profile_save'
                                    onClick={(event) => this.DeleteBoard(event)}>
                                Удалить
                            </button>
                            <button className='boards_delete_button_cancel'
                                    id={`board_${this.props.item.id}`}
                                    onClick={(event) => BoardItem.DeleteModal(event)}>
                                Отменить
                            </button>
                        </div>
                    </div>
                </div>

                {this.state.error_message &&
                    <p className="input_error"
                       ref={this.errorRef}>{this.state.error_message}</p>}
                <React.Fragment>
                    {this.state.isOpenUpdate && (
                        <CreateUpdateBoard
                            getHeader={() => this.props.getHeader()}
                            handleShowCreateUpdateBoard={() => this.handleShowUpdateBoard()}
                            item={this.props.item}
                            create_or_update='update'
                            title='Редактирование доски'
                            text_button='Сохранить'
                            text_p='Здесь Вы можете отредактировать основную информацию о доске'/>)
                    }
                </React.Fragment>
                <div className="boards_board_size">
                    <div className="boards_text">
                        <p
                            className='boards_title'>
                            <a href={board_open}>
                                {this.props.item.name}
                            </a>
                        </p>
                        <p className='boards_description'>{this.props.item.description}</p>
                    </div>
                </div>
                <div className="boards_buttons">
                    <div className="boards_open">
                        <a href={board_open}>
                            <div className="boards_buttons_open"></div>
                        </a>
                    </div>
                    <div className="boards_button_update_and_delete">

                        {update ? (
                            <a className='boards_button_a' href='#'>
                                <div className="boards_buttons_update"
                                     onClick={(event) => this.handleShowUpdateBoard(event)}></div>
                            </a>
                        ) : (
                            <div></div>
                        )}

                        <a className='boards_button_a' href='#'>
                            <div className="boards_buttons_delete"
                                 id={`board_${this.props.item.id}`}
                                 onClick={(event) => BoardItem.DeleteModal(event)}></div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}


class BoardItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenCreate: false,
        }
    }

    handleShowCreateBoard() {
        this.setState({isOpenCreate: !this.state.isOpenCreate});
    }

    render() {
        let other_boards = this.props.other_boards.length
        let other_boards_count = true
        if (other_boards === 0) {
            other_boards_count = false
        }
        return (
            <div className='boards_content'>
                <h2> Мои доски </h2>
                <div className="boards_me_boards_content">
                    <div className="boards_my_boards">
                        {this.props.my_boards.map(el => (
                            <BoardItem key={el.id} item={el}
                                       getHeader={() => this.props.getHeader()}
                                       isReload={() => this.props.isReload()}
                            />
                        ))}
                        <a className='boards_button_a' href='#'>
                            <div className="boards_board boards_new_board">
                                <div className="boards_board_size">
                                    <p className='boards_not_invitations_p'
                                       onClick={(event) => this.handleShowCreateBoard(event)}>
                                        Создать новую доску
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <React.Fragment>
                    {this.state.isOpenCreate && (
                        <CreateUpdateBoard
                            getHeader={() => this.props.getHeader()}
                            create_or_update='create'
                            handleShowCreateUpdateBoard={() => this.handleShowCreateBoard()}
                            title='Создание доски'
                            text_button='Создать'
                            text_p='Введите адреса электронной почты ваших коллег и пригласите их присоединиться к вашей доске в
                            BMeet'/>)
                    }
                </React.Fragment>

                <div className="boards_me_boards">
                    <h2>Доступные мне</h2>
                    <div className="boards_me_boards_content">
                        <div className="boards_my_boards">
                            {this.props.other_boards.map(el => (
                                <BoardItem key={el.id} item={el}
                                           getHeader={() => this.props.getHeader()}
                                           isReload={() => this.props.isReload()}
                                />
                            ))}
                            <div>
                                {other_boards_count ? (
                                    <div>
                                    </div>
                                ) : (
                                    <div
                                        className="boards_board boards_not_invitations">
                                        <div className="boards_board_size">
                                            <p className='boards_not_invitations_p'>У
                                                вас пока нет приглашений</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default BoardItems
