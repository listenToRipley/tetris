import {useState, useEffect} from 'react';
import {createStage} from '../StagePieces/gameHelper'

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {

    setRowsCleared(0);

    const sweepRows = newStage => 
      newStage.reduce((acc, row) => {
        //check if the row is full 
        if(row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          acc.unshift(new Array(newStage[0].length).fill([0, 'clear'])); //remove the rows, and then add new row to the top of the stage. 
          return acc
        }
        acc.push(row);
        return acc;
      }, [])
    

    const updateStage = prevStage => {

      //set update the stage and reset it
      const newStage = prevStage.map(row => 
        row.map(cell => (cell[1] !== 'clear' ? [0, 'clear'] : cell)),   
      );//the end of the mapping 

      //draw my shapes
      player.tetrominos.forEach((row, y) => {
        row.forEach((value, x) => {
          if(value !== 0) {
            newStage [y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`
            ];
          }
        });
      });

      //check collisions 
      if(player.collided) {
        resetPlayer();
        return sweepRows(newStage); //git add, check if the collision results in a completed row 
      }

      return newStage
    }//end of updateStage

    setStage(prev => updateStage(prev))

    //dependency 
  }, [player, resetPlayer, rowsCleared])

  return [stage, setStage, rowsCleared];
}