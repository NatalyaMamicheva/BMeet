import React from 'react';
import canvasState from "./store/canvasState";
import toolState from "./store/toolState";
import Brush from './tools/Brush';
import Line from './tools/Line';
import Rect from "./tools/Rect";
import Circle from "./tools/Circle";

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('touchstart', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('touchstart', this.handleClickOutside);

    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            let figure = document.querySelector('#board_figures')
            if (figure) {
                figure.style['display'] = null
            }
        }
    }

    collapseLineWidth() {}

    render() {
        return (

            <div className='board_toolbar'>
                <div className="toolbar_buttons board_undo_button"
                     onClick={() => canvasState.undo()}>
                </div>

                <div className="toolbar_buttons board_redo_button"
                     onClick={() => canvasState.redo()}>
                </div>

                <div>
                    <input className="toolbar_buttons board_color_button"
                           onChange={event => toolState.setStrokeColor(event.target.value)}
                           id="toolbar_color" type='color'>
                    </input>
                    <label htmlFor="toolbar_color"></label>
                </div>

                <div className="toolbar_buttons board_width_line"
                     onClick={(e) => canvasState.openLine(e)}>
                    <div className="board_line_content"
                         id="board_line_content">
                        <input className="board_line" id='board_line'
                               onChange={e => toolState.setLineWidth(e.target.value)}
                               type="range" defaultValue={1} min={1} max={50}/>
                    </div>
                </div>

                <div>
                    <input className="toolbar_buttons board_color_fill_button"
                           onChange={event => toolState.setFillColor(event.target.value)}
                           id="toolbar_color" type='color'>
                    </input>
                    <label htmlFor="toolbar_color"></label>
                </div>

                <div className="toolbar_buttons board_figure_content board_figure_content_board_rect"
                     ref={this.setWrapperRef}
                     onClick={(e) => canvasState.openFigure(e)}>
                    <div className="board_figures" id='board_figures'>
                        <div className="board_rect"
                             onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket))}></div>
                        <div className="board_circle"
                             onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket))}></div>
                        <div className="board__line"
                             onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket))}></div>
                    </div>
                </div>

                <div className="toolbar_buttons board_brush_active"
                     onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket))}>
                </div>

                <div className="toolbar_buttons board_eraser"></div>

                <div className="toolbar_collapse">
                    <a href='#' onClick={() => toolState.collapse()}>Свернуть</a>
                </div>
            </div>

        );
    }
}

export default Toolbar;
