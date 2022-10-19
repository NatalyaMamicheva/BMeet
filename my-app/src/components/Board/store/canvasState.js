import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas = null
    socket = null
    undo_list = []
    redo_list = []
    line_width = ''

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    setSocket(socket) {
        this.socket = socket
    }

    pushToUndo(data) {
        this.undo_list.push(data)
    }

    pushToRedo(data) {
        this.redo_list.push(data)
    }


    undo() {
        if (this.undo_list.length > 0) {
            let obj = this.undo_list.pop()
            this.pushToRedo(obj)
            this.socket.send(JSON.stringify({
                method: 'undo',
                data: obj
            }))
        }
    }

    redo() {
        if (this.redo_list.length > 0) {
            let obj = this.redo_list.pop()
            this.socket.send(JSON.stringify({
                method: 'redo',
                data: obj
            }))
        }
    }

    openLine(e) {
        this.line_width = e.target
        console.log(this.line_width)
        let target = this.line_width.querySelector('#board_line_content')
        document.addEventListener('click', event => {
            if (this.line_width !== event.target) {
                target.style['display'] = null
            }
        })
        if (!target.style['display']) {
            target.style['display'] = 'block'
        } else if (target.style['display']) {
            target.style['display'] = null
        }
    }

    openFigure(e) {
        let target = e.target.querySelector('#board_figures')
        if (!target.style['display']) {
            target.style['display'] = 'flex'
        } else if (target.style['display'] === 'flex') {
            target.style['display'] = null
        }
    }
}

export default new CanvasState()