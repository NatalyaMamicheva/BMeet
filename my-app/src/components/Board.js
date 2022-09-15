import React, { useRef, useEffect } from 'react';
import './board.css';
import SettingBar from "./SettingBar";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";

const Board = () => {

  return (
      <div>
        <h1>Доска {id}</h1>
       <Toolbar />
       <SettingBar />
       <Canvas />
      </div>
  );
};

export default Board;
