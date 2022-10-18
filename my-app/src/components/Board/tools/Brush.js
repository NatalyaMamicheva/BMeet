import Tool from "./Tool";


export default class Brush extends Tool {
    objects;

    constructor(canvas, socket) {
        super(canvas, socket);
        this.listen()
        this.coords = {
            "coord": [],
            "type": "r",
            "stroke_color": '',
            "fill_color": '',
            "width": this.ctx.lineWidth,
            "other_data": null
        };
        this.height = 0
        this.width = 0

    }

    listen() {
        this.updateColorButtonsToolbar()
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    };

    static drawLine(ctx, coord, fill_color, stroke_color, line_width) {
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
        ctx.beginPath();
        ctx.moveTo(coord[0][0] / scaleX, coord[0][1] / scaleY);
        ctx.stroke();
        coord.forEach(function (e) {
            ctx.lineTo(e[0] / scaleX, e[1] / scaleY);
            ctx.stroke();
        })
        ctx.strokeStyle = color_stroke_temp
        ctx.fillStyle = color_fill_temp
        ctx.lineWidth = line_width_temp
    };

    mouseUpHandler() {
        this.mouseDown = false;
        if (!this.mouseDown) {
            Brush.drawLine(this.ctx, this.coords.coord, this.ctx.fillStyle, this.ctx.strokeStyle)
            if (this.coords.coord.length > 0) {
                this.coords.stroke_color = this.ctx.strokeStyle
                this.coords.fill_color = this.ctx.fillStyle
                this.coords.width = this.ctx.lineWidth
                this.socket.send(JSON.stringify(this.coords));
                this.socket.onclose = function (e) {
                    if (e.wasClean) {
                        console.log(`[close] Соединение закрыто чисто, код=${e.code} причина=${e.reason}`);
                    } else {
                        console.log('[close] Соединение прервано');
                    }
                };
                this.socket.onerror = function (error) {
                    console.log(`[error] ${error.message}`);
                };
                this.coords.coord = [];

            }
        }
    };

    mouseDownHandler(e) {
        this.mouseDown = this.coords.coord.length <= 0;
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    };

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let scaleX = Tool.getScaleX(this.canvas.width)
            let scaleY = Tool.getScaleY(this.canvas.height)
            let x = e.pageX - e.target.offsetLeft
            let y = e.pageY - e.target.offsetTop
            this.coords.coord.push([x * scaleX, y * scaleY]);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    };
}
