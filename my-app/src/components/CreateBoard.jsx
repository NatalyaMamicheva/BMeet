import React from 'react'
import axios from 'axios'


class CreateBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name': '',
            'description': '',
            'group': '',
            'error_message': ''
        };
        this.errorRef = React.createRef();
    }

    handleCreateSubmit(event) {
        let headers = this.props.getHeader()
        let group = []
        let data = {}
        if (this.state.group) {
            for (let email of this.state.group.split(',')) {
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
                this.setState({'error_message': ''});
                this.props.handleShowCreateBoard(event)
            })
            .catch(error => {
                if (error.code === 'ERR_BAD_REQUEST') this.setState({'error_message': 'Проверьте правильность введенных email'});
                else this.setState({'error_message': error.message});
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
            <div className='new_board'>
                <form className='new_board_form'
                      onSubmit={(event) => this.handleCreateSubmit(event)}>
                    <p ref={this.errorRef}>{this.state.error_message}</p>
                    <div className="new_board_close">
                        <div
                            onClick={(event) => this.props.handleShowCreateBoard(event)}>
                            <div className="new_board_close_button"></div>
                        </div>
                    </div>
                    <div className="new_board_title">
                        <p>Создание доски</p>
                    </div>
                    <div className="new_board_text">
                        <p>Создайте новую доску в BMeet и предложите своим
                            коллегам присоединиться к Вам</p>
                    </div>

                    <div className="new_board_input">
                        <div className="new_board_input_title">
                            <span>Название</span>
                        </div>
                        <div className="new_board_input_border">
                            <label>
                                <input className='new_board_input_text'
                                       name="name" type="text" required
                                       placeholder='Введите название доски'
                                       onChange={(event) => this.handleChange(event)}
                                       value={this.state.name}></input>
                            </label>
                        </div>

                        <div className="new_board_input_title">
                            <span>Описание</span>
                        </div>
                        <div className="new_board_input_border">
                            <label>
                                <textarea name="description"
                                          placeholder='Введите описание'
                                          className='new_board_input_text new_board_input_text_area'
                                          onChange={(event) => this.handleChange(event)}
                                          value={this.state.description}>
                                </textarea>
                            </label>
                        </div>
                    </div>
                    <div className="new_board_invite_title">
                        <p>Пригласить коллег</p>
                    </div>
                    <div className="new_board_invite_text">
                        <p>
                            Введите адреса электронной почты ваших коллег и
                            пригласите их присоединиться к вашей доске в
                            BMeet
                        </p>
                        <div className="new_board_input_border new_board_input_email">
                            <label>
                                <input className='new_board_input_text'
                                       multiple
                                       placeholder='Введите несколько email через пробел'
                                       name="group" type="email"
                                       onChange={(event) => this.handleChange(event)}
                                       value={(this.state.group).replace(/ /g, ',')}></input>
                            </label>
                        </div>
                        <div className="new_board_invite_button">
                            <button type="submit" value="submit">Создать
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateBoard