import React from 'react'
import axios from 'axios'
import Header from '../Header.jsx'
import BoardItems from './BoardItems.jsx'
import '../../styles/boards_style.scss'
import Footer from "../Footer";


class BoardManagement extends React.Component {
    constructor(props) {
        super(props)
        this.errorRef = React.createRef();
        this.Ref = React.createRef();
        this.state = {
            isOpenCreate: false,
            my_boards: [],
            other_boards: [],
            error_message: '',
        };
    }

    isReload() {
        this.componentDidMount()
    }

    componentDidMount() {
        let my_boards = []
        let other_boards = []
        let headers = this.props.getHeader()
        axios
            .get(`http://${process.env.REACT_APP_BACKEND_HOST}/api/board/`,
                { headers })
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
                this.setState({ 'error_message': error.message })
                if (error.response.status === 401) {
                    this.props.logout()
                }
                this.errorRef.current.focus();
            })
        this.Ref.current.focus();
    }




    render() {
        return (
            <div ref={this.Ref}>
                <Header logout={() => this.props.logout()} />
                {this.state.error_message &&
                    <p className="error_p" ref={this.errorRef}>{this.state.error_message}</p>}
                <BoardItems my_boards={this.state.my_boards}
                    other_boards={this.state.other_boards}
                    getHeader={() => this.props.getHeader()}
                    isReload={() => this.isReload()}
                />
                <Footer />
            </div>
        )
    }
}

export default BoardManagement