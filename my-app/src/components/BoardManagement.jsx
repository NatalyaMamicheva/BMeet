import React from 'react'
import axios from 'axios'
import Header from './Header.jsx'
import CreateBoard from './CreateBoard.jsx'
import {Navigate, Link} from 'react-router-dom'
import Footer from "./Footer";
import "../styles/board_management.scss";



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
                <div className='title_my_boards'> Мои доски {localStorage.getItem('username')}</div>
                {this.props.my_boards.map(el => (
                    <BoardItem key={el.id} item={el}/>
                ))}
                <div className='title_all_boardss'>Доступные мне </div>
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
                <div className='cont_board'>
                                            
                    <Header logout={() => this.props.logout()}/>
                    <p className='error_p' ref={this.errorRef} >{this.state.error_message}</p>
                    <div>
                        <div class="css-modal-checkbox-container">
                            <label for="css-modal-checkbox" className="css-modal-checkbox">Создать новую доску</label>
                    </div>
                        <label for="css-modal-checkbox" className="my_add_board"></label>
                    <input type="checkbox" id="css-modal-checkbox" />  

                    {/* Это начало модального окна */}
                    <div className="cmc">
                        <div className="cmt">
                            <label for="css-modal-checkbox" className="css-modal-close"></label>
                            <div className='title_board'>Создание доски</div>
                            <div className='add_board'>
                            <p>Создайте новую доску в BMeet и предложите своим коллегам<br/>присоединиться к Вам</p></div>
                            <div className='board_name'>Название</div>
                            <input className='name_name' placeholder='Введите название доски'></input>
                            <div className='info_boaard'>Описание</div>
                            <p><textarea className='info_info'></textarea> </p>
                            <div className='board_people'>Пригласить коллег</div>
                            <div className='board_mail'>Введите адреса электронной почты ваших коллег и пригласите их присоединиться к вашей доске в BMeet </div>
                            <input className='add_boards'></input>
                            <button className='board_button' onClick={() => this.message()}>Создать</button>
                        </div>
                    </div>
                    <React.Fragment>
                            {this.state.isOpenCreate && (<CreateBoard getHeader={() => this.props.getHeader()} handleShowCreateBoard={() => this.handleShowCreateBoard()} />)}
                    </React.Fragment>
                    <BoardItems my_boards={this.state.my_boards} other_boards={this.state.other_boards} /> 
                    </div>
                    { /* Это конец модального окна */ }

                        <div className='my_all_boards' >
                        <div className='title_all_boards'>
                            <button className='all_board'>У Вас пока нет приглашений</button></div>
                        </div>

                         {/* Это начало карточки созданной доски  */}
                        <div className='block_card_board'>
                        <div className='name_board'>Здесь будет название доски
                        <div className='info_board'>Описание доски</div></div>
                    </div>
                                            <div class="css-modal-checkbox-container">
                            <label for="css-modal-checkbox" className="edit"></label>
                    </div>
                    <a href='/board/:id'><button className='log'></button></a>
                    <a href='#'><button className='trash'></button></a>
                     {/* Это конец карточки созданной доски  */}
                    
                    <Footer/>
             </div>
             
        )
    }
}

export default BoardManagement