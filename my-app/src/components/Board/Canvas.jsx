import React, {useEffect, useRef, useState} from 'react';
import {Navigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import canvasState from "./store/canvasState.js";
import toolState from "./store/toolState";
import Brush from "./tools/Brush";
import Rect from "./tools/Rect";
import Circle from "./tools/Circle";
import Line from "./tools/Line";
import Tool from "./tools/Tool";

const Canvas = observer(() => {
    const canvasRef = useRef()
    const [userAccess, setUserAccess] = useState(true);

    useEffect(() => {
        let pathname = window.location.pathname
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1)
        }
        let username = localStorage.getItem('username')
        canvasState.setCanvas(canvasRef.current)
        let url = `ws://${process.env.REACT_APP_BACKEND_HOST}/api${pathname}/?token=${localStorage.getItem('token').split(' ')[1]}`;
        let socket = new WebSocket(url);
        canvasState.setSocket(socket)
        toolState.setTool(new Brush(canvasRef.current, socket))
        socket.onopen = () => {
            console.log('Подключение установлено')
            window.addEventListener("resize", onResize);
            document.querySelector('html').style['overflow'] = 'hidden'
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
            document.querySelector('html').style['overflow'] = null
            if (error.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${error.code}`);
                if (error.code === 4003) {
                    setUserAccess(false)
                }
            }
        };
        socket.onerror = function (error) {
            document.querySelector('html').style['overflow'] = null
            console.log(`[error] ${error.message}`);
        };

        function onResize() {
            socket.send(JSON.stringify({
                method: 'resize'
            }))
            window.location.reload()
        }
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
                    Line.staticDrawStraightLine(ctx, object.coord[0], object.coord[1], object.coord[2], object.coord[3], object.fill_color, object.stroke_color, object.width)
            }
        })
    }

    if (!userAccess)
        return <Navigate to="/board_management"/>
    return (
        <div className="board_canvas">
            <canvas id="canvas" ref={canvasRef}
                    width={Tool.getWidthHeight()[0]}
                    height={Tool.getWidthHeight()[1]}/>
        </div>
    );
});

export default Canvas;
