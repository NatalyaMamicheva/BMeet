import React from 'react'
import axios from 'axios'
import Header from './Header.jsx'
import CreateBoard from './CreateBoard.jsx'
import {Navigate, Link} from 'react-router-dom'


class BoardItem extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div id={this.props.item.id}>
                <h3>{this.props.item.name} </h3>
                <p>{this.props.item.description} </p>
            </div>
        )
    }
}



class BoardItems extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div >
                <h1> Мои доски </h1>
                {this.props.my_boards.map(el => (
                    <BoardItem key={el.id} item={el}/>
                ))}
                <h1> Доски по приглашению </h1>
                {this.props.other_boards.map(el => (
                    <BoardItem key={el.id} item={el}/>
                ))}
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
                console.log(response.data)
                for (let board of response.data) {
                    if (board.author.username==localStorage.getItem('username')) my_boards.push(board)
                    else other_boards.push(board)
                }
                this.setState({ my_boards: my_boards,
                                other_boards: other_boards});
            })
            .catch(error => {
               this.setState({'error_message': error.message })
            })
    }

    handleShowCreateBoard(event){
        this.setState({ isOpenCreate: !this.state.isOpenCreate });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
             <div>
                  <Header logout={() => this.props.logout()}/>
                  <button  onClick={(event) => this.handleShowCreateBoard(event)}>Создать доску</button>
                  <React.Fragment>
                        {this.state.isOpenCreate && (<CreateBoard getHeader={() => this.props.getHeader()} handleShowCreateBoard={() => this.handleShowCreateBoard()} />)}
                  </React.Fragment>
                  <BoardItems my_boards={this.state.my_boards} other_boards={this.state.other_boards} />
                  <p className='error_p' ref={this.errorRef} >{this.state.error_message}</p>
             </div>
        )
    }
}

export default BoardManagement