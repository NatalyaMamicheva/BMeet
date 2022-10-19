import {makeAutoObservable} from "mobx";

class ToolState {
    tool = null
    fillColor = '#ffffff'

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
        this.tool.fillColor = this.fillColor
    }

    setFillColor(color) {
        this.tool.fillColor = color
        this.fillColor = color
    }

    setStrokeColor(color) {
        this.tool.strokeColor = color
    }

    setLineWidth(width) {
        this.tool.lineWidth = width
    }

    collapse() {
        let toolbar = document.querySelectorAll('.toolbar_buttons')
        let  collapse = document.querySelector('.toolbar_collapse')
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