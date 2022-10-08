import React from 'react'
import axios from 'axios'


class CreateUpdateBoard extends React.Component {
    constructor(props) {
        super(props)
        if (this.props.create_or_update === 'update')
            this.state = {
                'method': 'patch',
                'name': this.props.item.name,
                'description': this.props.item.description,
                'error_message': '',
                'email_items': this.setEmails(),
                'email_value': '',
                'email_error': null
            };
        else
            this.state = {
                'method': 'post',
                'name': '',
                'description': '',
                'error_message': '',
                'email_items': [],
                'email_value': '',
                'email_error': null
            };
        this.errorRef = React.createRef();
    }

    setEmails() {
        let email_items = []
        if (this.props.item.group) {
            for (let email of this.props.item.group)
                if (this.props.item.author.email !== email.email)
                    email_items.push(email.email)
        }
        if (this.props.item.group_no_register) {
            for (let email of this.props.item.group_no_register)
                email_items.push(email.email)
        }
        console.log(email_items)
        return email_items
    }

    handleCreateUpdateSubmit(event) {
        let headers = this.props.getHeader()
        let group = []
        let data = {}
        if (this.state.email_items) {
            for (let email of this.state.email_items) {
                group.push({ 'email': email });
            }
            data['group'] = group
        }
        data['name'] = this.state.name
        data['description'] = this.state.description
        if (this.state.method === 'post') {
            axios.request({
                url: `http://${process.env.REACT_APP_BACKEND_HOST}/api/board/`,
                method: this.state.method,
                headers: headers,
                data: data
            })
                .then(response => {
                    this.setState({ 'error_message': '' });
                    this.props.handleShowCreateUpdateBoard(event)
                })
                .catch(error => {
                    if (error.code === 'ERR_BAD_REQUEST') this.setState({ 'error_message': 'Проверьте правильность введенных email' });
                    else this.setState({ 'error_message': error.message });
                })
        }
        else {
            axios.request({
                url: `http://${process.env.REACT_APP_BACKEND_HOST}/api/board/update/${this.props.item.id}/`,
                method: this.state.method,
                headers: headers,
                data: data
            })
                .then(response => {
                    this.setState({ 'error_message': '' });
                    this.props.handleShowCreateUpdateBoard(event)
                })
                .catch(error => {
                    if (error.code === 'ERR_BAD_REQUEST') this.setState({ 'error_message': 'Проверьте правильность введенных email' });
                    else this.setState({ 'error_message': error.message });
                })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            email_error: null
        })
    }

    handleKeyDownEmail(event) {
        if (["Enter", "Tab", ",", " "].includes(event.key)) {
            event.preventDefault();

            var value = this.state.email_value.trim();

            if (value && this.isValid(value)) {
                this.setState({
                    email_items: [...this.state.email_items, this.state.email_value],
                    email_value: ""
                });
            }
        }
    };

    isValid(email) {
        let error = null;

        if (this.isInList(email)) {
            error = `${email} has already been added.`;
        }

        if (!this.isEmail(email)) {
            error = `${email} is not a valid email address.`;
        }

        if (error) {
            this.setState({ 'email_error': error });

            return false;
        }

        return true;
    }

    isInList(email) {
        return this.state.email_items.includes(email);
    }

    isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    handleDeleteEmail(item) {
        this.setState({
            email_items: this.state.email_items.filter(i => i !== item)
        });
    };


    render() {
        return (
            <div className='new_board'>
                <form className='new_board_form'
                    onSubmit={(event) => this.handleCreateUpdateSubmit(event)}>
                    {this.state.error_message &&
                        <p className="error">{this.state.error_message}</p>}
                    <div className="new_board_close">
                        <div
                            onClick={(event) => this.props.handleShowCreateUpdateBoard(event)}>
                            <div className="new_board_close_button"></div>
                        </div>
                    </div>
                    <div className="new_board_title">
                        <p>{this.props.title}</p>
                    </div>
                    <div className="new_board_text">
                        <p>{this.props.text_p}</p>
                    </div>

                    <div className="new_board_input">
                        <div className="new_board_input_title">
                            <span>Название</span>
                        </div>
                        <div className="new_board_input_border">
                            <label>
                                <input className='new_board_input_text'
                                    maxLength='25'
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
                                    maxLength='80'
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
                        <div
                            className="new_board_input_email">

                            {this.state.email_items.map(item => (
                                <div className="boards_tag_item" key={item}>
                                    <p>{item}</p>
                                    <div
                                        className='boards_email_close'
                                        onClick={() => this.handleDeleteEmail(item)}>
                                    </div>
                                </div>
                            ))}

                            <input
                                className='new_board_input_text_email'
                                name="email_value"
                                value={this.state.email_value}
                                onKeyDown={(event) => this.handleKeyDownEmail(event)}
                                onChange={(event) => this.handleChange(event)} />

                        </div>
                        {this.state.email_error &&
                            <p className="error">{this.state.email_error}</p>}
                        <div className="new_board_invite_button">
                            <button type="submit" value="submit">{this.props.text_button}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUpdateBoard