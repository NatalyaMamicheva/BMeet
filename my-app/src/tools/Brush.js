import Tool from "./Tool";


let coords = { /*Отсюда вызываются данные переданные с сервера на клиент и пишутся данные с клиента на сервер(после передачи на се
    рвер и после отрисовки данных с сервера, данные в этом объекте стираются для записи данных о новом объекте)*/
            
    "coord": [],
    "type": "r",
    "color": null,
    "width": null,
    "other_data": null
};


/* ОБРАЩЕНИЕ К СЕРВЕРУ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ЧЕРЕЗ СОКЕТ */

let socket = new WebSocket("ws://localhost:8000/board/5/");
socket.onmessage = function(e){
var data = JSON.parse(e.data)
if (data.type === "ADD_OBJECT") {
    let nums = (data.object.points).match(/\d+/g);
    console.log(data.type, nums)
    let len = nums.length;
    coords.coord.push([]);
    for (let quant = 0; quant < len; quant += 2) {
        coords.coord[0].push(nums.slice(parseInt(quant), quant + 2));
    }

    console.log(coords.coord);
}

if (data.type === "INITIAL_DATA") {
    let data_obj = data.data.objects;
    console.log(data_obj)
    let res = [];
    for (let point of data_obj) {
        res.push((point.coord).match(/\d+/g));
    }

    for (let quantity = 0; quantity < res.length; quantity++) {
        coords.coord.push([]);
        for (let qt = 0; qt < res[quantity].length; qt += 2) {
            coords.coord[quantity].push(res[quantity].slice(parseInt(qt), qt + 2));
        }
    }
    
    console.log(coords.coord);
}

};



/* ТЕСТОВЫЕ ДАННЫЕ */

// let addObj = {"type": "ADD_OBJECT", 
// "data": {"object": {"type": "r", 
// "points": "[502,213],[504,213],[506,213],[510,213],[513,214],[514,214],[515,214],[517,215],[518,215],[519,215],[520,215],[521,215],[522,215],[523,215],[524,216],[525,216],[526,216]", "id": "27"}}}

// let initData = {"type": "INITIAL_DATA", "data": {"objects": [{"type": "r", "points": "[487,400],[488,400],[489,400],[491,401],[493,401],[494,401],[495,401],[497,401],[498,402],[498,402],[499,402],[500,403],[501,403],[502,403],[502,403],[503,403]",
//  "id": "26"}, {"type": "r", "points": "[482,609],[483,609],[483,609],[485,609],[486,609],[486,609],[487,610],[489,610],[490,610],[490,610],[491,610],[492,610],[493,610],[493,611],[494,611],[494,611],[494,611],[495,611],[496,611],[497,611]", "id": "26"}]}}



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
