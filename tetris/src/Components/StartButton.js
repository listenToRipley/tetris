import React from 'react';
import {StyledStartButton} from './Styles/StyledStartButton'

//do we also want to use this as the reset button? pass in, "if game over, restart?" Or do we want to create a separate component? 

const StartButton = ({callback}) => (
  <StyledStartButton onClick={callback} >Start Game</StyledStartButton>
);

export default StartButton;