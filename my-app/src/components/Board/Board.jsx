import React from 'react';
import '../../styles/board_style.scss';
import Header from '../Header.jsx'
import Canvas from "./Canvas";

class Board extends React.Component {

    render() {
        return (
            <div>
                <Header logout={() => this.props.logout()}
                        getHeader={() => this.props.getHeader()}/>
                <Canvas/>
            </div>
        )
    }
}


export default Board;
