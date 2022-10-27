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
    }

    collapse() {
        let toolbar = document.querySelectorAll('.toolbar_buttons')
        let collapse = document.querySelector('.toolbar_collapse')
        toolbar.forEach(function (object) {
            if (object.style['display'] === 'none') {
                object.style['display'] = 'block'
            } else {
                object.style['display'] = 'none'
            }
        })
        let collapse_text = collapse.childNodes[0].text
        if (collapse_text === 'Развернуть') {
            collapse.childNodes[0].text = 'Свернуть'
            collapse.style['background'] = ''
        } else {
            collapse.childNodes[0].text = 'Развернуть'
        }
    }

}

export default new ToolState()