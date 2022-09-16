import Tool from "./Tool";


export default class Brush extends Tool {
    objects;

    constructor(canvas) {
        super(canvas);
        this.socket = this.connect_websocket();
        this.listen();
        this.count = 0;
        this.coords = {
            "coord": [],
            "type": "r",
            "color": null,
            "width": null,
            "other_data": null
        };
    };

    connect_websocket () {
        let url = `ws://${process.env.REACT_APP_BACKEND_HOST}${window.location.pathname}`;
        if (url.toString().slice(-1) !== '/') {
            url += '/'
        }
        let connect = new WebSocket(url);
        return (
            connect
        )
    }


    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            let data_objects = data.data.objects;

            for (let object of data_objects) {
                this.coords.coord.push(object.coord);
                this.drawLine(this.coords.coord)
                this.coords.coord = []
            }
        }
    };

    drawLine(coord) {
        for (let coord_array of coord) {
            this.ctx.beginPath();
            this.ctx.moveTo(coord_array[0][0], coord_array[0][1]);
            for (let arr in coord_array) {
                this.ctx.lineTo(`${coord_array[arr][0]}`, `${coord_array[arr][1]}`);
                this.ctx.stroke();
            }
        }
        this.count++
    };

    mouseUpHandler() {
        this.mouseDown = false;

        if (!this.mouseDown) {
            this.drawLine(this.coords.coord)

            if (this.coords.coord.length > 0) {
                /* ПЕРЕДАЧА ДАННЫХ СЕРВЕРУ ОТ КЛИЕНТА ЧЕРЕЗ СОКЕТЫ */
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
