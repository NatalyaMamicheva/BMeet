import React from 'react'
import axios from 'axios'
import Header from './Header.jsx'
import CreateBoard from './CreateBoard.jsx'
import '../styles/boards_style.scss'
import Footer from "./Footer";


class BoardItem extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        let author = this.props.item.author.username
        let user = localStorage.getItem('username')
        let update = false
        if (author === user) {
            update = true
        }
        return (
            <div id={this.props.item.id} className='boards_board'>
                <div className="boards_board_size">
                    <div className="boards_text">
                        <p className='boards_title'>{this.props.item.name} </p>
                        <p className='boards_description'>{this.props.item.description}</p>
                    </div>
                </div>
                <div className="boards_buttons">
                    <div className="boards_open">
                        <div className="boards_buttons_open"></div>
                    </div>
                    <div className="boards_button_update_and_delete">

                        {update ? (
                            <div className="boards_buttons_update"></div>
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
                            <BoardItem key={el.id} item={el}/>
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
                        <CreateBoard getHeader={() => this.props.getHeader()}
                                     handleShowCreateBoard={() => this.handleShowCreateBoard()}/>)}
                </React.Fragment>

                <div className="boards_me_boards">
                    <h2>Доступные мне</h2>
                    <div className="boards_me_boards_content">
                        <div className="boards_my_boards">
                            {this.props.other_boards.map(el => (
                                <BoardItem key={el.id} item={el}/>
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


class BoardManagement extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            isOpenCreate: false,
            my_boards: [],
            other_boards: [],
            error_message: ''
        };
    }

    componentDidMount() {
        let my_boards = []
        let other_boards = []
        let headers = this.props.getHeader()
        axios
            .get(`http://${process.env.REACT_APP_BACKEND_HOST}/api/board/`,
                {headers})
            .then(response => {
                for (let board of response.data) {
                    if (board.author.username === localStorage.getItem('username')) my_boards.push(board)
                    else other_boards.push(board)
                }
                this.setState({
                    my_boards: my_boards,
                    other_boards: other_boards
                });
            })
            .catch(error => {
                this.setState({'error_message': error.message})
            })
    }


    render() {
        return (
            <div>
                <Header logout={() => this.props.logout()}/>
                <BoardItems my_boards={this.state.my_boards}
                            other_boards={this.state.other_boards}/>
                <Footer/>
            </div>
        )
    }
}

export default BoardManagement