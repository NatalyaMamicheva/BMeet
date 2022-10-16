import Tool from "./Tool";

export default class Rect extends Tool {
    constructor(canvas, socket) {
        super(canvas, socket);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }



    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            "coord": [this.startX, this.startY, this.width, this.height],
            "type": "v",
            "stroke_color": this.ctx.strokeStyle,
            "fill_color": this.ctx.fillStyle,
            "width": this.ctx.lineWidth,
            "other_data": 'rect'
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            // this.draw(this.startX, this.startY, this.width, this.height)
        }
    }

    draw(x, y, w, h) {
        this.ctx.beginPath()
        this.ctx.rect(x, y, w, h)
        this.ctx.fill()
        this.ctx.stroke()
    }

    static staticDrawRect(ctx, x, y, w, h, fill_color, stroke_color, line_width) {
        let color_stroke_temp = ctx.strokeStyle
        let color_fill_temp = ctx.fillStyle
        let line_width_temp = ctx.lineWidth
        ctx.fillStyle = fill_color
        ctx.strokeStyle = stroke_color
        ctx.lineWidth = line_width
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.fill()
        ctx.stroke()
        ctx.strokeStyle = color_stroke_temp
        ctx.fillStyle = color_fill_temp
        ctx.lineWidth = line_width_temp
    }
}