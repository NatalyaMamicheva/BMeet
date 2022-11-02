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
            let toolbar = document.querySelector('.board_toolbar')
            if (figure) {
                figure.style['display'] = null
            }
            if (toolbar) {
                toolbar.style['display'] = null
            }
        }
    }

    render() {
        return (

            <div className='board_toolbar' ref={this.setWrapperRef}>
                <div className="toolbar_buttons board_undo_button"
                     onClick={() => canvasState.undo()}
                     data-tooltip="Отменить">
                </div>

                <div className="toolbar_buttons board_redo_button"
                     onClick={() => canvasState.redo()}
                     data-tooltip="Повторить">
                </div>

                <div>
                    <input className="toolbar_buttons board_color_button"
                           onChange={event => toolState.setStrokeColor(event)}
                           id="toolbar_color" type='color' data-tooltip="Цвет">
                    </input>
                    <label htmlFor="toolbar_color"></label>
                </div>

                <div className="toolbar_buttons board_width_line"
                     onClick={(e) => canvasState.openLine(e)}
                     data-tooltip="Толщина">
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
                           id="toolbar_color" type='color'
                           data-tooltip="Заливка">
                    </input>
                    <label htmlFor="toolbar_color"></label>
                </div>

                <div
                    className="toolbar_buttons board_figure_content board_figure_content_board_rect"
                    ref={this.setWrapperRef}
                    onClick={(e) => canvasState.openFigure(e)}
                    data-tooltip="Фигуры">
                    <div className="board_figures" id='board_figures'>
                        <div className="board_rect"
                             onClick={(e) => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket), e)}></div>
                        <div className="board_circle"
                             onClick={(e) => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket), e)}></div>
                        <div className="board__line"
                             onClick={(e) => toolState.setTool(new Line(canvasState.canvas, canvasState.socket), e)}></div>
                    </div>
                </div>

                <div className="toolbar_buttons board_brush_active"
                     data-tooltip="Карандаш"
                     onClick={(e) => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket), e)}>
                </div>

                <div className="toolbar_buttons board_eraser"
                     onClick={(e) => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket), e)}
                     data-tooltip="Ластик"></div>
            </div>

        );
    }
}

export default Toolbar;
