import React from 'react';
import { Navigate } from 'react-router-dom'
import '../../styles/board.scss';
import Header from '../Header.jsx'
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";

const Board = () => {

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');

    if (!name) return <Navigate to="/board_management" />;
    return (

        <div>
            <Header board_name={name} />
            <Toolbar />
            <Canvas />
        </div>
    );
};

export default Board;
