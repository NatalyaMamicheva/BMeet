import Tool from "./Tool";


let coords = { /*Отсюда вызываются данные переданные с сервера на клиент и пишутся данные с клиента на сервер(после передачи на се
    рвер и после отрисовки данных с сервера, данные в этом объекте стираются для записи данных о новом объекте)*/
            
    "coord": [],
    "color": null,
    "width": null,
    "other_data": null
};

/* ОБРАЩЕНИЕ К СЕРВЕРУ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ЧЕРЕЗ СОКЕТ */

let socket = new WebSocket("ws://localhost:8000/board/1/");

socket.onmessage = (e) => coords.coord.push(e.data);

/* ОБРАЩЕНИЕ К СЕРВЕРУ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ЧЕРЕЗ HTTP */

// const getData = async (url) => {

//     const response = await fetch(url);
  
//     if (!response.ok) {
//       throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
//     }
  
//     return await response.json();
  
//   };

//   let get_server =  getData('https://jsonplaceholder.typicode.com/todos/1'); //тестовые данные со стороннего сервера 
//   get_server.then(data => coords.coord.push([[data.userId + 200, data.userId + 200], [248, 471],
//     [256, 464], [278, 446], [350, 402], [425, 370], [493, 356], [517, 356], [560, 363], [577, 374], [582, 378]], [[590, 389],
//     [595, 396], [599, 400], [600, 401], [606, 403], [613, 402], [693, 356], [751, 318], [848, 255], [890, 226],[893, 222]])); 
//     // эти данные придут c сервера в формате {"coord": [[x, y], [x, y]], [[x, y], [x, y]]} 


export default class Brush extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen();
        this.count = 0; //Кол-во кликов для определения количества объектов создынных на холсте
    };
    

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
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

            socket.onopen = (e) => {
                console.log("Отправка данных....");
                socket.send(JSON.stringify(coords));
            };
            console.log(JSON.stringify(coords)); //То, что клиент отправит серверу(тестовый вывод в консоль, пока нет url)
            coords.coord = [];

            // socket.onclose = (e) => {
            //     if (e.wasClean) {
            //       console.log(`[close] Соединение закрыто чисто, код=${e.code} причина=${e.reason}`);
            //     } else {
            //         console.log('[close] Соединение прервано');
            //     }
            //   };
              
            // socket.onerror = (error) => {
            //     console.log(`[error] ${error.message}`);
            // };
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
