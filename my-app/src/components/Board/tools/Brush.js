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
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    };

    static drawLine(ctx, coord, fill_color, stroke_color, line_width) {
        let color_stroke_temp = ctx.strokeStyle
        let color_fill_temp = ctx.fillStyle
        let line_width_temp = ctx.lineWidth
        ctx.fillStyle = fill_color
        ctx.strokeStyle = stroke_color
        ctx.lineWidth = line_width
        for (let coord_array of coord) {
            ctx.beginPath();
            ctx.moveTo(coord_array[0][0], coord_array[0][1]);
            for (let arr in coord_array) {
                ctx.lineTo(`${coord_array[arr][0]}`, `${coord_array[arr][1]}`);
                ctx.stroke();
            }
        }
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
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    };

    draw(x, y) {
        if (this.mouseDown) {
            this.coords.coord.push([x, y]);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    };

}
