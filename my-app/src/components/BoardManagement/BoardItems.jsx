import React from 'react'
import axios from 'axios'
import CreateUpdateBoard from './CreateUpdateBoard.jsx'
import '../../styles/boards_style.scss'
// import ModalDelete from './ModalDelete.jsx'
import '../../styles/delete.scss'


class BoardItem extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            isOpenUpdate: false,
            error_message: ''
        }
    }


    handleShowUpdateBoard(event) {
        this.setState({ isOpenUpdate: !this.state.isOpenUpdate });
    }

    DeleteBoard(event) {
        let headers = this.props.getHeader()
        axios.request({
            url: `http://${process.env.REACT_APP_BACKEND_HOST}/api/board/delete/${this.props.item.id}/`,
            method: 'delete',
            headers: headers,
        })
            .then(response => {
                this.setState({ 'error_message': '' });
                this.props.isReload()
            })
            .catch(error => {
                this.setState({ 'error_message': error.message })
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
        let board_open = '/board/' + this.props.item.id + '/'
        return (
            
            <div id={this.props.item.id} className='boards_board'>
                {this.state.error_message &&
                    <p className="error_p" ref={this.errorRef}>{this.state.error_message}</p>}
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
                         <div id="css-modal-details">    
                            <details id='details'>
                                <summary onClick={(event) => this.open_window(event)} className="boards_buttons_delete"></summary>
                                <div id="cmc">
                                    <div id="cmt">
                                        {/* <div className='modal_close'><button className='close_window'
                                        onClick={(event) => this.close_window(event)}></button></div> */}
                                                                                            <form >
                                                    <button className="delete_close_button" type="submit" value="submit"></button>
                                                    </form>
                                    <div className='text_window'>
                                    <div className='delete_board_title'>Удаление доски</div>  
                                    <div className='delete_board_descr'>Вы уверены, что хотите удалить доску?</div>
                                    </div>
                                    <div className='button_window'>
                                    <button classname='btnn_delete_board' 
                                    onClick={(event) => this.DeleteBoard(event)}>Удалить</button>
                                                <form >
                                                    <button type="submit" value="submit">Отмена</button>
                                                    </form>
                                                    
                                </div>  
                                </div>
                                </div>
                            </details>
                        </div>
                        {/* <modalDelete/> */}
                        {/* <div className="boards_buttons_delete" onClick={(event) => this.DeleteBoard(event)}></div> */}
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
                            <BoardItem key={el.id} item={el}
                                getHeader={() => this.props.getHeader()}
                                isReload={() => this.props.isReload()}
                            />
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