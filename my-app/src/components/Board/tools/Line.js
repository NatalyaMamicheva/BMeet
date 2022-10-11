import Tool from "./Tool";


export default class Line extends Tool {
    constructor(canvas, socket) {
        super(canvas, socket);
        this.listen()
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.currentX = e.pageX - e.target.offsetLeft
        this.currentY = e.pageY - e.target.offsetTop

    }

    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            "coord": [this.currentX, this.currentY, this.x, this.y],
            "type": "v",
            "stroke_color": this.ctx.strokeStyle,
            "fill_color": this.ctx.fillStyle,
            "width": this.ctx.lineWidth,
            "other_data": 'line'
        }))
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.x = e.pageX - e.target.offsetLeft
            this.y = e.pageY - e.target.offsetTop;
            this.draw(this.x, this.y)
        }
    }


    draw(x, y) {
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY)
        this.ctx.lineTo(x, y)
        if (!this.mouseDown)
            this.ctx.stroke()
    }

    static staticDrawStrightLine(ctx, start_x, start_y, x, y, fill_color, stroke_color, line_width) {
        let color_stroke_temp = ctx.strokeStyle
        let color_fill_temp = ctx.fillStyle
        let line_width_temp = ctx.lineWidth
        ctx.fillStyle = fill_color
        ctx.strokeStyle = stroke_color
        ctx.lineWidth = line_width
        ctx.beginPath()
        ctx.moveTo(start_x, start_y)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.strokeStyle = color_stroke_temp
        ctx.fillStyle = color_fill_temp
        ctx.lineWidth = line_width_temp
    }
}