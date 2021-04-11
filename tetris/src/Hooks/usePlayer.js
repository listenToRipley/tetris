import {useState, useCallback} from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelper';
import {TETROMINOS, randomTetromino} from '../tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {x: 0, y:0},
    tetromino: TETROMINOS[0].shape,
    collided: false
  });
                  //tetrominos
  const rotate = (matrix, dir) => {
    //make rows => columns
    const rotateTetro = matrix.map((_, index) => 
      matrix.map(col => col[index])
      );
    //reverse reach row to get the rotation in array
      //bigger than zero
      if(dir > 0) return rotateTetro.map(row => row.reverse());
      return rotateTetro.reverse();

    }

  const playerRotate = (stage, dir) => {

    const copyPlayer = JSON.parse(JSON.stringify(player)); //deep clone, won't mutate
    copyPlayer.tetromino = rotate(copyPlayer.tetromino, dir)

    //make sure the rotation doesn't go outside of stage && make sure it does not cross over into another shape
    const pos = copyPlayer.pos.x
    let offset = 1;

    while(checkCollision(copyPlayer, stage, {x:0, y:0})) {
      copyPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1)); //back and forth movements
      console.log('checking on copy')
      if(offset > copyPlayer.tetromino[0].length) {
        rotate(copyPlayer.tetromino, -dir);
        copyPlayer.pos.x = pos; 
        return;
      }
    }

    setPlayer(copyPlayer)
  }

  const updatePlayerPos = ({x, y, collided}) => {
    //set state
    
    setPlayer(prev => ({
      ...prev,
      pos: {x:(prev.pos.x +=x), y:(prev.pos.y +=y)},
      collided,
    }));
  };

  //need to use call back here to prevent infinite loop 
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: {x: STAGE_WIDTH/2 - 2,y: 0},
      tetromino: randomTetromino().shape,
      collided: false
    })
  }, [])


  return [player, updatePlayerPos, resetPlayer, playerRotate];
}