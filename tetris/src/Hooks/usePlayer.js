import {useState} from 'react';
import {randomTetromino} from '../StagePieces/tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {x: 0, y:0},
    tetrominos: randomTetromino().shape,
    collided: false
  });

  const updatePlayerPos = (({x, y, collided}) => {
    //set state
    setPlayer(prev => ({
      ...prev,
      pos: {x:(prev.pos.x +=x), y:(prev.pos.y +=y)},
      collided,
    }))
  })

  return [player];
}