import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import canvasState from "./store/canvasState.js";
import Brush from "./tools/Brush";
import Rect from "./tools/Rect";
import Circle from "./tools/Circle";
import Line from "./tools/Line";

const Canvas = observer(() => {
    const canvasRef = useRef()


    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        let url = `ws://${process.env.REACT_APP_BACKEND_HOST}/api${window.location.pathname}?token=${localStorage.getItem('token').split(' ')[1]}`;
        let socket = new WebSocket(url);
        canvasState.setSocket(socket)
        socket.onopen = () => {
            console.log('Подключение установлено')
        }
        socket.onmessage = (event) => {
            let data = JSON.parse(event.data)
            let msg_type = data.type
            if (msg_type === 'INITIAL_DATA' || msg_type === 'UPDATE_BOARD') {
                canvasState.undo_list = []
                canvasState.redo_list = []
                canvasState.pushToRedo(data.data.redo_object)
                canvasState.pushToUndo(data.data.undo_object)
                if (msg_type === 'UPDATE_BOARD') {
                    let ctx = canvasRef.current.getContext('2d')
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            }
            if (msg_type === 'ADD_OBJECT')
                canvasState.pushToUndo(data.data.objects[0])
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

        data_objects.forEach(function (object) {
            if (object.type === "r") {
                Brush.drawLine(ctx, object.coord, object.fill_color, object.stroke_color, object.width)
            } else {
                if (object.other_data === 'rect')
                    Rect.staticDrawRect(ctx, object.coord[0], object.coord[1], object.coord[2], object.coord[3], object.fill_color, object.stroke_color, object.width)
                else if (object.other_data === 'circle')
                    Circle.staticDrawCircle(ctx, object.coord[0], object.coord[1], object.coord[2], object.fill_color, object.stroke_color, object.width)
                else if (object.other_data === 'line')
                    Line.staticDrawStrightLine(ctx, object.coord[0], object.coord[1], object.coord[2], object.coord[3], object.fill_color, object.stroke_color, object.width)
            }
        })
    }


    return (
        <div className="board_canvas">
            <canvas ref={canvasRef} width={window.innerWidth - 118}
                    height={window.innerHeight - 105}/>
        </div>
    );
});

export default Canvas;