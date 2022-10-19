import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import canvasState from "./store/canvasState.js";
import toolState from "./store/toolState";
import Brush from "./tools/Brush";
import Rect from "./tools/Rect";
import Circle from "./tools/Circle";
import Line from "./tools/Line";

const Canvas = observer(() => {
    const canvasRef = useRef()
    const [userAccess, setUserAccess] = useState(true);
    const [dataURL, setDataURL] = useState('');

    useEffect(() => {
        let username = localStorage.getItem('username')
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvasState.setCanvas(canvasRef.current)
        let url = `ws://${process.env.REACT_APP_BACKEND_HOST}/api${window.location.pathname}/?token=${localStorage.getItem('token').split(' ')[1]}`;
        let socket = new WebSocket(url);
        canvasState.setSocket(socket)
        toolState.setTool(new Brush(canvasRef.current, socket))
        socket.onopen = () => {
            console.log('Подключение установлено')
            window.addEventListener('resize', onResize);
        }
        socket.onmessage = (event) => {
            let data = JSON.parse(event.data)
            let msg_type = data.type
            if (data.data.undo_object && data.data.undo_object.user === username)
                canvasState.pushToUndo(data.data.undo_object)
            if (data.data.redo_object && data.data.redo_object.user === username)
                canvasState.pushToRedo(data.data.redo_object)
            if (msg_type === 'UPDATE_BOARD') {
                let ctx = canvasRef.current.getContext('2d')
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            }
            drawHandler(data)
        }
        socket.onclose = function (error) {
            if (error.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${error.code}`);
                if (error.code === 4003) {
                    setUserAccess(false)
                }
            }
        };
        socket.onerror = function (error) {
            console.log(`[error] ${error.message}`);
        };

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            let img = document.createElement('img');
            img.src = canvas.toDataURL('image/png')
            context.drawImage(img, 0, 0);
            context.restore();
        };


    }, [])


    // const onResize = () => {
    //     let canvas = document.querySelector('#canvas')
    //     const context = canvas.getContext('2d');
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     let img = document.createElement('img');
    //     img.src = this.canvas.toDataURL('image/png');;
    //     context.drawImage(img, 0, 0);
    //     context.restore();
    // };


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


    if (!userAccess)
        return <Navigate to="/board_management" />
    return (
        <div className="board_canvas">
            <canvas className="canvas" ref={canvasRef} width={window.innerWidth - 118}
                height={window.innerHeight - 105} />
        </div>
    );
});

export default Canvas;
