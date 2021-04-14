export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, "clear"]));
console.log('tell me about the game helper height ', STAGE_HEIGHT, 'AND width', STAGE_WIDTH)
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // check we're on a tetromino cell
      if (player.tetromino[y][x] !== 0) {
        console.log('found collision in game helper!')
        if (
          // check we're moving inside game area height (y)
          // tetromino should not go through bottom game area
          !stage[y + player.pos.y + moveY] ||
          // check we're moving inside game area width(x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // check cell we're moving to isn't set to clear (if is it clear, no collision)
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
  return false;
};