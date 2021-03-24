import React from 'react';
import Cell from './Cell';
import {StyledStage} from './Styles/StyledStage'

export const Stage = ({stage}) => {
  const height = stage.length
  const width = stage[0].length
  return(
    <StyledStage width={width} height={height}>
      {stage.map(row => row.map((cell, x) => { return <Cell key={x} type={cell[0]}/>}))}
    </StyledStage>
  )
}
