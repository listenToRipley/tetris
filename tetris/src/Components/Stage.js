import React from 'react';
import Cell from './Cell';
import {StyledStage} from './Styles/StyledStage'

export const Stage = ({stage}) => {
  const height = stage.length
  const width = stage[0].length
  console.log(`why can't you ready width on stage?`, width)
  return(
    <StyledStage width={width} height={height}>
      {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/>))}
      {console.log('mapping the stage component')}
    </StyledStage>
  )
}
