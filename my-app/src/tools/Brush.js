import Tool from "./Tool";


let coords = { /*Отсюда вызываются данные переданные с сервера на клиент и пишутся данные с клиента на сервер(после передачи на се
    рвер и после отрисовки данных с сервера, данные в этом объекте стираются для записи данных о новом объекте)*/
            
    "coord": [],
    "type": "r",
    "color": null,
    "width": null,
    "other_data": null
};

let socket = new WebSocket("ws://localhost:8000/board/5/");

export default class Brush extends Tool {
    constructor(canvas, board_id) {
        super(canvas);
        this.id = board_id
        console.log(this.id)
        this.listen();
        this.count = 0; //Кол-во кликов для определения количества объектов создынных на холсте
    };
    

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        socket.onmessage = (e) => {
            var data = JSON.parse(e.data)
            for (let object of data.data.objects) {
                    coords.coord.push(object.coord);
                    this.drawLine()
            }
        }


    };

    drawLine() {
        for (let coord_array of coords.coord) {
                this.ctx.beginPath();
                this.ctx.moveTo(coord_array[0][0],coord_array[0][1]);
                for (let arr in coord_array) {
                    this.ctx.lineTo(`${coord_array[arr][0]}`,`${coord_array[arr][1]}`);
                    this.ctx.stroke();
                }
            }
        this.count++
        coords.coord = [];

     };

    mouseUpHandler(e) {
        
        this.mouseDown = false;

        if(!this.mouseDown) {
            for (let coord_array of coords.coord) {
                this.ctx.beginPath();
                this.ctx.moveTo(coord_array[0][0],coord_array[0][1]);
                for (let arr in coord_array) {
                    this.ctx.lineTo(`${coord_array[arr][0]}`,`${coord_array[arr][1]}`);
                    this.ctx.stroke();
                }
            }

        this.count++


        if (coords.coord.length > 0) {
            // ПЕРЕДАЧА ДАННЫХ СЕРВЕРУ ОТ КЛИЕНТА ЧЕРЕЗ http
            // const sendData = async (url, data) => {
            //     const response = await fetch(url, {
            //       method: 'POST',
            //       body: data,
            //     });
              
            //     if (!response.ok) {
            //       throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
            //     }
              
            //     return await response.json();
            //   }
            
            //   sendData("#", JSON.stringify(coords));
            

            /* ПЕРЕДАЧА ДАННЫХ СЕРВЕРУ ОТ КЛИЕНТА ЧЕРЕЗ СОКЕТЫ */

                console.log("Отправка данных....");
                socket.send(JSON.stringify(coords));


            socket.onclose = function (e) {
                if (e.wasClean) {
                  console.log(`[close] Соединение закрыто чисто, код=${e.code} причина=${e.reason}`);
                } else {
                    console.log('[close] Соединение прервано');
                }
              };
              
            socket.onerror = function (error) {
                console.log(`[error] ${error.message}`);
            };

            console.log(JSON.stringify(coords)); //То, что клиент отправит серверу(тестовый вывод в консоль, пока нет url)
            coords.coord = []; 

        }
    }

    };

    mouseDownHandler(e) {

        if (coords.coord.length > 0) {
            this.mouseDown = false;
        }
        else {

            this.mouseDown = true;
        }

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
            coords.coord.push([x, y]);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }

    };

}
