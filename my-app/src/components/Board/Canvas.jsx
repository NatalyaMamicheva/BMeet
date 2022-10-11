import React, { useEffect, useRef } from 'react';
import "../../styles/canvas.scss"
import { observer } from "mobx-react-lite";
import canvasState from "./store/canvasState.js";
import Brush from "./tools/Brush";
import Rect from "./tools/Rect";
import Circle from "./tools/Circle";
import Line from "./tools/Line";

const Canvas = observer(() => {
    const canvasRef = useRef()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        let url = `ws://${process.env.REACT_APP_BACKEND_HOST}/api${window.location.pathname}`;
        if (url.toString().slice(-1) !== '/') {
            url += '/'
        }
        let socket = new WebSocket(url);
        canvasState.setSocket(socket)
        socket.onopen = () => {
            console.log('Подключение установлено')
        }
        socket.onmessage = (event) => {
            let data = JSON.parse(event.data)
            drawHandler(data)
        }
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
    }, [])


    const drawHandler = (data) => {
        let data_objects = data.data.objects;
        const ctx = canvasRef.current.getContext('2d');
        for (let object of data_objects) {
            // eslint-disable-next-line default-case
            switch (object.type) {
                case "r":
                    let coord = []
                    for (let object of data_objects) {
                        coord.push(object.coord)
                        Brush.drawLine(ctx, coord, object.fill_color, object.stroke_color, object.width)
                        coord = []
                    }
                    break
                case "v":
                    if (object.other_data === 'rect')
                        Rect.staticDrawRect(ctx, object.coord[0], object.coord[1], object.coord[2], object.coord[3], object.fill_color, object.stroke_color, object.width)
                    else if (object.other_data === 'circle')
                        Circle.staticDrawCircle(ctx, object.coord[0], object.coord[1], object.coord[2], object.fill_color, object.stroke_color, object.width)
                    else if (object.other_data === 'line')
                        Line.staticDrawStrightLine(ctx, object.coord[0], object.coord[1], object.coord[2], object.coord[3], object.fill_color, object.stroke_color, object.width)
                    break
            }
        }
    }

    return (
        <div className="canvas">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
        </div>
    );
});

export default Canvas;