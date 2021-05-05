import React from 'react';
import Cell from './Cell';
import {StyledStage} from './Styles/StyledStage'

export const Stage = ({stage}) => {
  const columns = stage.length
  const rows = stage[0].length
  console.log(`why can't you ready width on stage?`, rows)
  return(
    <StyledStage width={rows} height={columns}>
      {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/>))}
      {console.log('mapping the stage component')}
    </StyledStage>
  )
}
