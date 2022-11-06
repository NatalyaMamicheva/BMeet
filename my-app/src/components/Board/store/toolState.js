import {makeAutoObservable} from "mobx";

class ToolState {
    tool = null
    fillColor = '#ffffff'
    strokeColor = ''
    lineWidth = 1

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool, event) {
        if (event) {
            let eraser = document.querySelector('.board_eraser')
            let eraser_active = document.querySelector('.board_eraser_active')
            if (event.target === (eraser || eraser_active)) {
                this.tool.strokeColor = '#ffffff'
                if (this.tool.ctx.lineWidth !== 10) {
                    this.lineWidth = this.tool.ctx.lineWidth
                }
                this.tool.lineWidth = 10
                if (eraser) {
                    this.strokeColor = this.tool.coords.stroke_color
                    this.fillColor = this.tool.coords.fill_color
                    if (!this.tool.coords.fill_color) {
                        this.strokeColor = '#000000'
                    }
                }
            } else {
                if (!this.strokeColor) {
                    this.tool.strokeColor = '#000000'
                    this.strokeColor = '#000000'
                } else {
                    this.tool.strokeColor = this.strokeColor
                }
                this.tool.ctx.lineWidth = this.lineWidth
            }
        }
        this.tool = tool
        this.tool.fillColor = this.fillColor
    }

    setFillColor(color) {
        this.tool.fillColor = color
        this.fillColor = color
    }

    setStrokeColor(event) {
        let eraser_active = document.querySelector('.board_eraser_active')
        if (event) {
            if (!eraser_active) {
                this.tool.strokeColor = event.target.value
            }
            this.strokeColor = event.target.value
        }
    }

    setLineWidth(width) {
        this.tool.lineWidth = width
        this.lineWidth = width
    }

    static remove_class(toolbar) {
        toolbar.classList.remove('board_header_toolbar_brush')
        toolbar.classList.remove('board_header_toolbar_eraser')
        toolbar.classList.remove('board_header_toolbar_circle')
        toolbar.classList.remove('board_header_toolbar_rect')
        toolbar.classList.remove('board_header_toolbar_line')
    }

    collapse(e) {
        let target = e.target
        let board_header_toolbar = document.querySelector('#board_header_toolbar')
        let toolbar = document.querySelectorAll('.board_toolbar')[0]

        let board_rect = document.querySelector('.board_rect')
        let board_circle = document.querySelector('.board_circle')
        let board__line = document.querySelector('.board__line')
        let board_brush = document.querySelector('.board_brush')
        let board_brush_active = document.querySelector('.board_brush_active')
        let board_eraser = document.querySelector('.board_eraser')
        let board_eraser_active = document.querySelector('.board_eraser_active')

        if (target === board_header_toolbar || target === board_rect || target === board_circle
            || target === board__line || target === board_brush ||
            target === board_brush_active || target === board_eraser ||
            target === board_eraser_active) {
            if (toolbar.style['display'] === 'block') {
                toolbar.style['display'] = null
                if (target.classList.value === 'board_rect') {
                    ToolState.remove_class(board_header_toolbar)
                    board_header_toolbar.classList.add('board_header_toolbar_rect')
                } else if (target.classList.value === 'board_circle') {
                    ToolState.remove_class(board_header_toolbar)
                    board_header_toolbar.classList.add('board_header_toolbar_circle')
                } else if (target.classList.value === 'board__line') {
                    ToolState.remove_class(board_header_toolbar)
                    board_header_toolbar.classList.add('board_header_toolbar_line')
                } else if (target.classList.value.split(' ')[1] === 'board_brush' ||
                    target.classList.value.split(' ')[1] === 'board_brush_active') {
                    ToolState.remove_class(board_header_toolbar)
                    board_header_toolbar.classList.add('board_header_toolbar_brush')
                } else if (target.classList.value.split(' ')[1] === 'board_eraser' ||
                    target.classList.value.split(' ')[1] === 'board_eraser_active') {
                    ToolState.remove_class(board_header_toolbar)
                    board_header_toolbar.classList.add('board_header_toolbar_eraser')
                }
            } else {
                toolbar.style['display'] = 'block'
            }
        }
    }

}

export default new ToolState()