import React from 'react'
import '../../styles/delete.scss'

class modalDelete extends React.Component {

    render() {
        return (
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
        )
    }
}

export default modalDelete