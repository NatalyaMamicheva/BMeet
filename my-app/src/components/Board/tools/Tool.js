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
        this.canvas.ontouchmove = null
        this.canvas.onmousedown = null
        this.canvas.ontouchstart = null
        this.canvas.onmouseup = null
        this.canvas.ontouchend = null
    }

    removeFigureClass(figure_class, figure) {
        figure_class.forEach((e) => {
            figure.classList.remove(e)
            figure.classList.remove(`${e}_active`)
        })
    }

    updateColorButtonsToolbar() {
        let brush = document.querySelector('.board_brush_active')
        let circle = document.querySelector('.board_circle')
        let rect = document.querySelector('.board_rect')
        let line = document.querySelector('.board__line')
        let figure = document.querySelector('.board_figure_content')
        let eraser = document.querySelector('.board_eraser')
        let figure_class = ['board_figure_content_board_rect', 'board_figure_content_board_circle', 'board_figure_content_board__line']

        document.addEventListener('click', event => {
            let element = event.target
            if (element === brush) {
                brush.classList.add('board_brush_active')
                brush.classList.remove('board_brush')
                eraser.classList.remove('board_eraser_active')
                eraser.classList.add('board_eraser')
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
                eraser.classList.remove('board_eraser_active')
                eraser.classList.add('board_eraser')
            } else if (element === eraser) {
                eraser.classList.remove('board_eraser')
                eraser.classList.add('board_eraser_active')
                brush.classList.add('board_brush')
                brush.classList.remove('board_brush_active')
                this.removeFigureClass(figure_class, figure)
                figure.classList.add('board_figure_content_board_rect')
            }
        })
    }

    static getWidthHeight() {
        let width_window = window.innerWidth - 58
        let width_height = window.innerHeight - 104
        let height = this.getHeight(width_window)
        for (width_window; height > width_height; width_window--) {
            height = this.getHeight(width_window)
        }
        return (
            [width_window, height]
        )
    }

    static getScaleX(width) {
        let width_start = 1605
        return (
            width_start / width
        )
    }

    static getScaleY(height) {
        let height_start = 800
        return (
            height_start / height
        )
    }

    static getHeight(width) {
        let height_start = 800
        let height_result = height_start / (this.getScaleX(width))
        return (
            height_result
        )
    }
}

