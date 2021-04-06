import React from 'react';
import {StyledCell} from './Styles/StyledCell'
import {TETROMINOS} from '../tetrominos'

const Cell = ({type}) => (

  <StyledCell type={type} color={TETROMINOS[type].color} >
  {console.log('rerender in Cell')}
  </StyledCell>
)
//only render as needed
export default React.memo(Cell);