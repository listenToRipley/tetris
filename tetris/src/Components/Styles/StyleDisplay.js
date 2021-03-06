import styled from 'styled-components';

export const StyledDisplay = styled.div`
  display: flex;
  box-size: border-box;
  align-items: center;
  justify-content: center;
  margin: 0 0 20px 10vw;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${props => (props.gameOver ? 'red': '#999')};
  background: #000;
  font-family: arial; 
  font-size: 0.8rem;
`