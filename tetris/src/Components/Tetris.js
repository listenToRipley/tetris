import React from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton'; 

const Tetris = () => {

  return(
    <div>Ready to play?
    <Stage/>
    <aside>
      <div>
      <Display text="Score"/>
       <Display text="Rows" />
       <Display text="Levels"/>
       <Display text="Time"/>
      </div>
      <StartButton/>
    </aside>
    </div> 
  )
}


export default Tetris;