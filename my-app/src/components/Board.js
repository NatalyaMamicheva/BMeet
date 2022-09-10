import React, { useRef, useEffect } from 'react';
import './board.css';
import {useParams} from 'react-router-dom'

const Board = () => {
  const {id} =  useParams()

  return (
      <div>
        <h1>Доска {id}</h1>
      </div>
  );
};

export default Board;