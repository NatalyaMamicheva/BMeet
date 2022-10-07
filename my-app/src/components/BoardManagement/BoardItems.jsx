import React from 'react'
import CreateUpdateBoard from './CreateUpdateBoard.jsx'
import '../../styles/boards_style.scss'


class BoardItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenUpdate: false,
        }
    }


    handleShowUpdateBoard(event) {
        this.setState({ isOpenUpdate: !this.state.isOpenUpdate });
    }

    render() {
        let author = this.props.item.author.username
        let user = localStorage.getItem('username')
        let update = false
        if (author === user) {
            update = true
        }
        let board_open = '/board/' + this.props.item.id + '/'
        return (
            <div id={this.props.item.id} className='boards_board'>
                <React.Fragment>
                    {this.state.isOpenUpdate && (
                        <CreateUpdateBoard
                            getHeader={() => this.props.getHeader()}
                            handleShowCreateUpdateBoard={() => this.handleShowUpdateBoard()}
                            item={this.props.item}
                            create_or_update='update'
                            title='Редактирование доски'
                            text_button='Сохранить'
                            text_p='Здесь Вы можете отредактировать основную информацию о доске' />)
                    }
                </React.Fragment>
                <div className="boards_board_size">
                    <div className="boards_text">
                        <a href={board_open}><p
                            className='boards_title'>{this.props.item.name} </p>
                        </a>
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
                            <div className="boards_buttons_update" onClick={(event) => this.handleShowUpdateBoard(event)}></div>
                        ) : (
                            <div></div>
                        )}

                        <div className="boards_buttons_delete"></div>
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
        this.setState({ isOpenCreate: !this.state.isOpenCreate });
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
                            <BoardItem key={el.id} item={el} getHeader={() => this.props.getHeader()} />
                        ))}
                        <div className="boards_board boards_new_board">
                            <div className="boards_board_size">
                                <p className='boards_not_invitations_p'
                                    onClick={(event) => this.handleShowCreateBoard(event)}>
                                    Создать новую доску
                                </p>
                            </div>
                        </div>
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
                            BMeet' />)
                    }
                </React.Fragment>

                <div className="boards_me_boards">
                    <h2>Доступные мне</h2>
                    <div className="boards_me_boards_content">
                        <div className="boards_my_boards">
                            {this.props.other_boards.map(el => (
                                <BoardItem key={el.id} item={el} getHeader={() => this.props.getHeader()} />
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