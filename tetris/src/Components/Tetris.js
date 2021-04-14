import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//comps
import { Stage } from './Stage';
import { Display } from './Display';
import { StartButton } from './StartButton'; 
//hooks
import { usePlayer } from '../Hooks/usePlayer';
import { useStage } from '../Hooks/useStage';
import { useInterval } from '../Hooks/useIntervals';
import { useGameStatus } from '../Hooks/useGameStatus';
//styles
import { StyledTetrisWrapper, StyledTetris } from './Styles/StyledTetris';
import { StyledRight, StyledMid } from './Styles/StyleContainers';
//helpers
import { createStage, checkCollision } from '../gameHelper'

const Tetris = () => {
  // speed time depending on level
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log("re-render");

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // reset
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const pauseGame = () => {
    //stop current action - no re-render 
      //clock should stop
    //second click should restart the game which it was left off. - restart clock

    //this will be a toggle 
  }

  const drop = () => {
    // increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // increase speed when level increases
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      console.log('no collision? - tetris')
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log("GAME OVER!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("interval on");
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    console.log("interval off");
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  console.log('tell me about the stage in Tetris > ', stage)
  return (
    // we are using the wrapper to handle key inputs
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(event) => move(event)}
      onKeyUp={keyUp}
    >

      <StyledTetris>
      <Stage stage={stage}/>
          <StyledMid>
            {gameOver ? (
              <Display gameOver={gameOver} text="GAME OVER :("/>
            ) : (
              <StyledRight>
              {/* need to change for after set has occured */}
              <Display text={`Score : ${score}`}/> 
              <Display text={`Row : ${rows}`} /> 
              <Display text={`Level : ${level}`}/> 
         {/* might want to create a different   component for this */}
              <Display text="Time : "/> 
            </StyledRight>
            )
            }
            <StartButton callback={startGame}/>
         </StyledMid>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};


export default Tetris;