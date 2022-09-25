import React from 'react'
import axios from 'axios'
import Header from './Header.jsx'
import {Navigate, Link} from 'react-router-dom'
import "../styles/board_management.scss";


class CreateBoard extends React.Component {
    constructor(props) {
        super(props)
         this.state = {
            'name':'',
            'description':'',
            'group':'',
            'error_message':''
         };
         this.errorRef = React.createRef();
    }

    handleCreateSubmit(event) {
        let headers = this.props.getHeader()
        let group = []
        let data = {}
        if (this.state.group) {
            for (let email of this.state.group.split(' ')) {
                group.push({'email': email});
            }
            data['group'] = group
        }
        data['name'] = this.state.name
        data['description'] = this.state.description
        axios.request({
            url: `http://${process.env.REACT_APP_BACKEND_HOST}/api/board/`,
            method: "post",
            headers: headers,
            data: data
        })
        .then(response => {
            this.setState({'error_message': '' });
            this.props.handleShowCreateBoard(event)
        })
        .catch(error => {
            if (error.code == 'ERR_BAD_REQUEST') this.setState({'error_message': 'Проверьте правильность введеных email' });
            else this.setState({'error_message': error.message });
        })
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
           <form onSubmit={(event) => this.handleCreateSubmit(event)} >
              <p className='error_p' ref={this.errorRef} >{this.state.error_message}</p>
                <div className="cmc">
                    <div className="cmt">
                        <label onClick={(event) =>  this.props.handleShowCreateBoard(event)} for="css-modal-checkbox" className="css-modal-close"></label>
                    </div>
                </div>
              <div className='title_board'>Создание доски</div>
              <div className='add_board'>
                    <p>Создайте новую доску в BMeet и предложите своим коллегам<br/>присоединиться к Вам</p></div>
              <div className='board_name'>Название</div>
              <input name="name" className='name_name' type="text" placeholder='Введите название доски' required 
              onChange={(event) => this.handleChange(event)} value={this.state.name}></input>
              <div className='info_board'>Описание</div>
              <p><textarea className='info_info' name="description"
              onChange={(event) => this.handleChange(event)} value={this.state.description}></textarea></p>
              <div className='board_people'>Пригласить коллег</div>
              <div className='board_mail'>Введите адреса электронной почты ваших коллег и пригласите их присоединиться 
              к вашей доске в BMeet </div>
              <input className='add_boards' name="group" type="text"
                    onChange={(event) => this.handleChange(event)} value={this.state.group}></input>
                    <button className='board_button' onClick={() => this.message()}>Создать</button>
          </form>
        
        )
    }
}

export default CreateBoard