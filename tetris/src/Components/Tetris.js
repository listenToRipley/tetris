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
  //speed time depending on level 
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(); //call the hook you are using 
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer); //call the stage you are creating 
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log('tetris render component')

  const movePlayer = (dir) => {
    //move left and right
    if(!checkCollision(player, stage, {x:dir, y: 0})) {
      updatePlayerPos({x:dir, y:0})
    }
  }

  const startGame = () => {
    //reset everything
    setStage(createStage());
    setDropTime(1000); //can use this to create a clock?
    resetPlayer(); //not yet currently
    //if we use as restart, it will also reset displays 
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  }

  const drop = () => {
    //increase level after clear 10 rows

    if(rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      //increase the  the speed for each level 
      setDropTime(1000 / (level + 1) + 200); 
    }

    if(!checkCollision(player, stage, {x:0, y: 1})) {
      updatePlayerPos({x:0, y:1, collided: false})
    } else {
      //loose condition 

        if([player.pos.y < 1]) {
          console.log('GAME OVER')
          setGameOver(true);
          setDropTime(null);
          //set restart here? 
        }
      updatePlayerPos({x: 0, y:0, collided: true});
    }
  }

  const keyUp = ({keyCode}) => {
    console.log('interval on')
    //move faster on the down button
    if(!gameOver) {
      if(keyCode === 40) { //key up events
        setDropTime(1000 / (level + 1 ) + 200); 
      }
    };
  };

  const dropPlayer = () => {
    console.log('interval off')
    setDropTime(null);
    drop();
    
  }

  const move = ({keyCode}) => {
    //include the event of the movement? Does this need to be an use effect? 
    //logic should also include that a collision has not occurred, nor reach the end. 
    if(!gameOver) {
      //left arrow
      if(keyCode === 37) {
        movePlayer(-1);
        //to the right
      } else if (keyCode === 39) {
        movePlayer(1);
        //down
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    };
  };


  useInterval(() => {
    drop();
  }, dropTime);

  return (

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