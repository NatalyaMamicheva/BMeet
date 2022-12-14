import Tool from "./Tool";


export default class Circle extends Tool {
    constructor(canvas, socket) {
        super(canvas, socket);
        this.listen()
        this.height = 0
        this.width = 0
        this.start_ = false
        this.end_ = true
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

    mouseDownHandler(e) {
        if (this.start_ && !this.end_) {
            this.start_ = false
        } else if (!this.start_ && this.end_) {
            this.start_ = true
            this.end_ = false
            this.mouseDown = true
            this.touchStart = true
            this.ctx.beginPath()
            this.startX = e.pageX - e.target.offsetLeft || e.touches[0].pageX - e.target.offsetLeft
            this.startY = e.pageY - e.target.offsetTop || e.touches[0].pageY - e.target.offsetTop
        }
    }

    mouseUpHandler(e) {
        if (this.start_ && !this.end_) {
            let scaleX = Tool.getScaleX(this.canvas.width)
            let scaleY = Tool.getScaleY(this.canvas.height)
            this.mouseDown = false
            this.touchStart = false
            if (this.r > 0) {
                this.socket.send(JSON.stringify({
                    "coord": [this.startX * scaleX, this.startY * scaleY, this.r * (((scaleX + scaleY) / 2))],
                    "type": "v",
                    "stroke_color": this.ctx.strokeStyle,
                    "fill_color": this.ctx.fillStyle,
                    "width": this.ctx.lineWidth,
                    "other_data": 'circle'
                }))
            }
        }
        this.start_ = false
        this.end_ = true
        this.r = 0
    }

    mouseMoveHandler(e) {
        if (this.mouseDown || this.touchStart) {
            if (this.start_ && !this.end_) {
                let scaleX = Tool.getScaleX(this.canvas.width)
                let scaleY = Tool.getScaleY(this.canvas.height)
                let currentX = e.pageX - e.target.offsetLeft || e.touches[0].pageX - e.target.offsetLeft
                let currentY = e.pageY - e.target.offsetTop || e.touches[0].pageY - e.target.offsetTop
                let width = currentX - this.startX
                let height = currentY - this.startY
                this.r = Math.sqrt(width ** 2 + height ** 2)
                // this.draw(this.startX * scaleX, this.startY * scaleY, this.r * (((scaleX + scaleY) / 2)))
            }
        }
    }

    draw(x, y, r) {
        let scaleX = Tool.getScaleX(this.canvas.width)
        let scaleY = Tool.getScaleY(this.canvas.height)
        this.ctx.beginPath()
        this.ctx.arc(x / scaleX, y / scaleY, r / ((scaleX + scaleY) / 2), 0, 2 * Math.PI)
        this.ctx.fill()
        this.ctx.stroke()
    }

    static staticDrawCircle(ctx, x, y, r, fill_color, stroke_color, line_width) {
        this.height = ctx.canvas.height
        this.width = ctx.canvas.width
        let scaleX = Tool.getScaleX(this.width)
        let scaleY = Tool.getScaleY(this.height)
        let color_stroke_temp = ctx.strokeStyle
        let color_fill_temp = ctx.fillStyle
        let line_width_temp = ctx.lineWidth
        ctx.fillStyle = fill_color
        ctx.strokeStyle = stroke_color
        ctx.lineWidth = line_width
        ctx.beginPath()
        ctx.arc(x / scaleX, y / scaleY, r / ((scaleX + scaleY) / 2), 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
        ctx.strokeStyle = color_stroke_temp
        ctx.fillStyle = color_fill_temp
        ctx.lineWidth = line_width_temp
    }
}