//arrays board - stage 
export const STAGE_WIDTH = 12; 
export const STAGE_HEIGHT = 20;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));
console.table('re-render : ',createStage())

export const checkCollision = (player, stage, {x: moveX, y:moveY}) => {

  for(let y=0; y < player.tetromino.length; ++y) {
    
    for(let x=0; x < player.tetromino.length; ++x) {
      //make sure we are in the tetromino cell 
      if(player.tetromino[y][x] !==0) {
        //make sure we are within the game area, both height and width nor drop out the bottom
        //set the section variable to verify the if collided and set the clear to merge

        if(//make sure the next move it valid 
          !stage[y + player.pos.y + moveY] || 
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][y + player.pos.x + moveX][1] !== 'clear' 
        ) {
          return true;
        }
      };
    }
  }
  return false;
};