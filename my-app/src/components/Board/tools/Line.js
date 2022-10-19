import Tool from "./Tool";


export default class Line extends Tool {
    constructor(canvas, socket) {
        super(canvas, socket);
        this.listen()
    }

    listen() {
        this.updateColorButtonsToolbar()
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.currentX = (e.pageX - e.target.offsetLeft)
        this.currentY = (e.pageY - e.target.offsetTop)

    }

    mouseUpHandler(e) {
        let scaleX = Tool.getScaleX(this.canvas.width)
        let scaleY = Tool.getScaleY(this.canvas.height)
        let scale = (scaleX + scaleY) / 2
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            "coord": [this.currentX * scale, this.currentY * scale, this.x, this.y],
            "type": "v",
            "stroke_color": this.ctx.strokeStyle,
            "fill_color": this.ctx.fillStyle,
            "width": this.ctx.lineWidth,
            "other_data": 'line'
        }))
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let scaleX = Tool.getScaleX(this.canvas.width)
            let scaleY = Tool.getScaleY(this.canvas.height)
            let scale = (scaleX + scaleY) / 2
            this.x = (e.pageX - e.target.offsetLeft) * scale
            this.y = (e.pageY - e.target.offsetTop) * scale
        }
    }


    draw(x, y) {
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    static staticDrawStraightLine(ctx, start_x, start_y, x, y, fill_color, stroke_color, line_width) {
        this.height = ctx.canvas.height
        this.width = ctx.canvas.width
        let scaleX = Tool.getScaleX(this.width)
        let scaleY = Tool.getScaleY(this.height)
        let scale = (scaleX + scaleY) / 2
        let color_stroke_temp = ctx.strokeStyle
        let color_fill_temp = ctx.fillStyle
        let line_width_temp = ctx.lineWidth
        ctx.fillStyle = fill_color
        ctx.strokeStyle = stroke_color
        ctx.lineWidth = line_width
        ctx.beginPath()
        ctx.moveTo(start_x / scale, start_y / scale)
        ctx.lineTo(x / scale, y / scale)
        ctx.stroke()
        ctx.strokeStyle = color_stroke_temp
        ctx.fillStyle = color_fill_temp
        ctx.lineWidth = line_width_temp
    }
}