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

    removeFigureClass(figure_class, figure) {
        figure_class.forEach((e) => {
            figure.classList.remove(e)
            figure.classList.remove(`${e}_active`)
        })
    }

    updateColorButtonsToolbar() {
        let brush = document.querySelector('.board_brush')
        let circle = document.querySelector('.board_circle')
        let rect = document.querySelector('.board_rect')
        let line = document.querySelector('.board__line')
        let figure = document.querySelector('.board_figure_content')
        let figure_class = ['board_figure_content_board_rect', 'board_figure_content_board_circle', 'board_figure_content_board__line']

        document.addEventListener('click', event => {
            let element = event.target
            if (element === brush) {
                brush.classList.add('board_brush_active')
                brush.classList.remove('board_brush')
                this.removeFigureClass(figure_class, figure)
                figure.classList.add('board_figure_content_board_rect')
            } else if (element === rect || element === line || element === circle) {
                let figure_content = figure.classList.value.split(' ')[1]
                try {
                    var figure_content_add = `${figure_content}_${event.path[0].classList.value}_active`
                } catch (err) {
                    figure_content_add = `${figure_content}_${event.toElement.classList.value}_active`
                }
                this.removeFigureClass(figure_class, figure)
                figure.classList.add(figure_content_add)
                brush.classList.add('board_brush')
                brush.classList.remove('board_brush_active')
            }
        })
    }
}

