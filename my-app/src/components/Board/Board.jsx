import React from 'react';
import '../../styles/board.scss';
import Header from '../Header.jsx'
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";

const Board = () => {

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    console.log(name)


    return (
        <div>
            <Header board_name={name} />
            <Toolbar />
            <Canvas />
        </div>
    );
};

export default Board;
