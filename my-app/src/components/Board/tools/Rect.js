import Tool from "./Tool";

export default class Rect extends Tool {
    constructor(canvas, socket) {
        super(canvas, socket);
        this.listen()
    }

    listen() {
        this.updateColorButtonsToolbar()
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.ontouchmove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.ontouchstart = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.ontouchend = this.mouseUpHandler.bind(this)
    }


    mouseUpHandler(e) {
        let scaleX = Tool.getScaleX(this.canvas.width)
        let scaleY = Tool.getScaleY(this.canvas.height)
        this.mouseDown = false
        this.touchStart = false
        this.socket.send(JSON.stringify({
            "coord": [this.startX * scaleX, this.startY * scaleY, this.width * scaleX, this.height * scaleY],
            "type": "v",
            "stroke_color": this.ctx.strokeStyle,
            "fill_color": this.ctx.fillStyle,
            "width": this.ctx.lineWidth,
            "other_data": 'rect'
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.touchStart = true
        this.ctx.beginPath()
        this.startX  = e.pageX - e.target.offsetLeft || e.touches[0].pageX - e.target.offsetLeft
        this.startY  = e.pageY - e.target.offsetTop || e.touches[0].pageY - e.target.offsetTop
    }

    mouseMoveHandler(e) {
        if (this.mouseDown || this.touchStart) {
            let scaleX = Tool.getScaleX(this.canvas.width)
            let scaleY = Tool.getScaleY(this.canvas.height)
            let currentX = e.pageX - e.target.offsetLeft || e.touches[0].pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop || e.touches[0].pageY - e.target.offsetTop
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            // this.draw(this.startX * scaleX, this.startY * scaleY, this.width * scaleX, this.height * scaleY)
        }
    }

    draw(x, y, w, h) {
        let scaleX = Tool.getScaleX(this.canvas.width)
        let scaleY = Tool.getScaleY(this.canvas.height)
        this.ctx.beginPath()
        this.ctx.rect(x / scaleX, y / scaleY, w / scaleX, h / scaleX)
        this.ctx.fill()
        this.ctx.stroke()
    }

    static staticDrawRect(ctx, x, y, w, h, fill_color, stroke_color, line_width) {
        let scaleX = Tool.getScaleX(ctx.canvas.width)
        let scaleY = Tool.getScaleY(ctx.canvas.height)
        let color_stroke_temp = ctx.strokeStyle
        let color_fill_temp = ctx.fillStyle
        let line_width_temp = ctx.lineWidth
        ctx.fillStyle = fill_color
        ctx.strokeStyle = stroke_color
        ctx.lineWidth = line_width
        ctx.beginPath()
        ctx.rect(x / scaleX, y / scaleY, w / scaleX, h / scaleY)
        ctx.fill()
        ctx.stroke()
        ctx.strokeStyle = color_stroke_temp
        ctx.fillStyle = color_fill_temp
        ctx.lineWidth = line_width_temp
    }
}