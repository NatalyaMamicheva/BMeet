import React, { useRef, useEffect } from 'react';
import './board.css';
import {useParams} from 'react-router-dom'
import SettingBar from "./SettingBar";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";

const Board = () => {
  const {id} =  useParams()

  return (
      <div>
        <h1>Доска {id}</h1>
       <Toolbar board_id={id} />
       <SettingBar />
       <Canvas />
      </div>
  );
};

export default Board;