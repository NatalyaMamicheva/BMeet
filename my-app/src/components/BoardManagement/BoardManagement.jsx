import React from 'react'
import axios from 'axios'
import Header from '../Header.jsx'
import BoardItems from './BoardItems.jsx'
import '../../styles/boards_style.scss'


class BoardManagement extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.state = {
            isOpenCreate: false,
            my_boards: [],
            other_boards: [],
            is_load: false,
            error_message: '',
        };
    }

    isReload() {
        this.setState({is_load: false})
        let my_boards = []
        let other_boards = []
        let headers = this.props.getHeader()
        axios
            .get(`http://${process.env.REACT_APP_BACKEND_HOST}/api/board/`,
                {headers})
            .then(response => response.data)
            .then((result) => {
                    for (let board of result) {
                        if (board.author.username === localStorage.getItem('username')) my_boards.push(board)
                        else other_boards.push(board)
                    }
                    this.setState({
                        my_boards: my_boards,
                        other_boards: other_boards,
                        is_load: true
                    });
                },
            )
            .catch(error => {
                this.setState({
                    error_message: error.message,
                    is_load: true
                })
                if (error.response.status === 401) {
                    this.props.logout()
                }
                this.errorRef.current.focus();
            })
    }

    componentDidMount() {
        this.isReload()
    }

    render() {
        if (!this.state.is_load) return <div>Загрузка...</div>;

        return (
            <div>
                <Header logout={() => this.props.logout()}/>
                {this.state.error_message &&
                    <p className="input_error"
                       ref={this.errorRef}>{this.state.error_message}</p>}
                <BoardItems my_boards={this.state.my_boards}
                            other_boards={this.state.other_boards}
                            getHeader={() => this.props.getHeader()}
                            isReload={() => this.isReload()}
                />
            </div>
        )
    }
}

export default BoardManagement