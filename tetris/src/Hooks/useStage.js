import {useState, useEffect} from 'react';
import {createStage} from '../gameHelper'

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  console.log(`input : ${player} ${resetPlayer}`)

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) => 
      newStage.reduce((acc, row) => {
        //check if the row is full 
        console.log('stage new state reducer sweep')
        if(row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          acc.unshift(new Array(newStage[0].length).fill([0, 'clear'])); //remove the rows, and then add new row to the top of the stage. 
          return acc
        }
        acc.push(row);
        return acc;
      }, [])
    

    const updateStage = (prevStage) => {

      //set update the stage and reset it
      const newStage = prevStage.map((row) => 
        row.map((cell) => (cell[1] !== 'clear' ? [0, 'clear'] : cell))
        );//the end of the mapping 

      //draw my shapes
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if(value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`
            ];
          }
        });
      });

      //check collisions 
      if(player.collided) {
        resetPlayer();
        console.log('checking for collision in the stage')
        return sweepRows(newStage); //git add, check if the collision results in a completed row 
      }

      return newStage;
    }//end of updateStage

    setStage((prev) => updateStage(prev));

    //dependency 
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};