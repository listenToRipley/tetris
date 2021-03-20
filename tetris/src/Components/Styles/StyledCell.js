import styled from 'styled-components';

export const StyledCell = styled.div`
  display:inline;
  width: auto;
  background: #000000;
  color:rgb(164, 164, 184);
  border: ${props => props.type === 0 ? '0px solid' : '4px solid'};
  border-bottom-color: rgba(${props => props.color}, 0.1);
  border-right-color: rgba(${props => props.color}, 1);
  border-left-color: rgba(${props => props.color}, 0.3);
  border-top-color: rgba(${props => props.color}, 1);
`