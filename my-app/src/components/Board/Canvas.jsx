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
        let all_objects_list = []
        canvasState.setCanvas(canvasRef.current)
        let url = `ws://${process.env.REACT_APP_BACKEND_HOST}/api${window.location.pathname}?token=${localStorage.getItem('token').split(' ')[1]}`;
        let socket = new WebSocket(url);
        canvasState.setSocket(socket)
        socket.onopen = () => {
            console.log('Подключение установлено')
        }
        socket.onmessage = (event) => {
            let data = JSON.parse(event.data)
            if (data.type === 'INITIAL_DATA') {
                all_objects_list = []
                for (let object of data.data.objects) {
                    all_objects_list.push(object)
                    canvasState.pushToRedo(object)
                    if (object.user === localStorage.getItem('username'))
                        canvasState.pushToUndo(data.data.objects[0])
                }
                let ctx = canvasRef.current.getContext('2d')
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                drawHandler(data)
            }
            if (data.type === 'ADD_OBJECT' && data.data.objects[0].user === localStorage.getItem('username'))
                canvasState.pushToUndo(data.data.objects[0])
            // { 'data': { 'objects': undo_list } }
            drawHandler(data)
        }
        socket.onclose = function (error) {
            if (error.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${error.code} причина=${error.reason}`);
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