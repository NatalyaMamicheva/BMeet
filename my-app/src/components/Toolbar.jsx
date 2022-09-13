import React from 'react';
import "../styles/toolbar.scss";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from '../tools/Brush';

const Toolbar = (board_id) => {

    return (

        <div className='toolbar'>
            <button id='MyButton' className='toolbar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas, 2))} />
        </div>

    );
};

export default Toolbar;