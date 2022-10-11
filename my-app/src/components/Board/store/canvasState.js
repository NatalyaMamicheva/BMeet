import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas = null
    socket = null

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    setSocket(socket) {
        this.socket = socket
    }


}

export default new CanvasState()