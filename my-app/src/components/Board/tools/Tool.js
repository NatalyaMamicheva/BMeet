export default class Tool {
    constructor(canvas, socket) {
        this.canvas = canvas
        this.socket = socket
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

    set fillColor(color) {
        this.ctx.fillStyle = color
    }

    set strokeColor(color) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width
    }

    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }

    updateColorButtonsToolbar() {
        let brush = document.querySelector('.board_brush')
        let circle = document.querySelector('.board_circle')
        let rect = document.querySelector('.board_rect')
        let line = document.querySelector('.board__line')
        let figure = document.querySelector('.board_figure_content')

        document.addEventListener('click', event => {
            let element = event.target
            if (element === brush) {
                brush.classList.add('board_brush_active')
                brush.classList.remove('board_brush')
                figure.classList.add('board_figure_content')
                figure.classList.remove('board_figure_content_active')
            } else if (element === rect || element === line || element === circle) {
                figure.classList.add('board_figure_content_active')
                brush.classList.add('board_brush')
                brush.classList.remove('board_brush_active')
            }
        })
    }
}

