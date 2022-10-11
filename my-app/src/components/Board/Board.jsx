import React from 'react';
import '../../styles/board.scss';
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";

const Board = () => {

    return (
        <div>
            <Toolbar />
            <Canvas />
        </div>
    );
};

export default Board;
