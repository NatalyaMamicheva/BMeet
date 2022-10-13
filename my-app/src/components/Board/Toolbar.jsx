import React from 'react';
import "../../styles/toolbar.scss";
import canvasState from "./store/canvasState";
import toolState from "./store/toolState";
import Brush from './tools/Brush';
import Line from './tools/Line';
import Rect from "./tools/Rect";
import Circle from "./tools/Circle";

const Toolbar = () => {

    return (

        <div className='toolbar'>
            <button className='toolbar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket))} />
            <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket))} />
            <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket))} />
            <button className="toolbar__btn line" onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket))} />
            <label htmlFor="stroke-color">Цвет линии/обводки</label>
            <input onChange={event => toolState.setStrokeColor(event.target.value)} id="stroke-color" type="color" />
            <label htmlFor="stroke-color">Цвет заливки</label>
            <input onChange={event => toolState.setFillColor(event.target.value)} style={{ marginLeft: 10 }} type="color" />
            <label htmlFor="line-width">Толщина линии</label>
            <input
                onChange={e => toolState.setLineWidth(e.target.value)}
                style={{ margin: '0 10px' }}
                id="line-width"
                type="number" defaultValue={1} min={1} max={50}
            />
            <button className="toolbar__btn undo" onClick={() => canvasState.undo()} />
            <button className="toolbar__btn redo" onClick={() => canvasState.redo()} />
        </div>

    );
};

export default Toolbar;
