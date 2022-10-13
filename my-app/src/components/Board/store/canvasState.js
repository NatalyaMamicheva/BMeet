import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas = null
    socket = null
    undo_list = []
    redo_list = []

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
            let data = this.redo_list.pop()
            this.socket.send(JSON.stringify({
                method: 'redo',
                data: data
            }))
        }
    }


}

export default new CanvasState()