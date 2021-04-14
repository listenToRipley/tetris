import styled from 'styled-components';
import city from '../Img/city.png'

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(city);
  background-size: cover;
  overflow: hidden;
`

export const StyledTetris = styled.div`
  display: flex;
  ${'' /* align-items: flex-start; */}
  justify-content: auto;
  padding: 40px;
  margin: 0;
  max-width: 50%;

    aside {
      width: 100%;
      max-width: 200px;
      display: block;
      padding: 0 20px;
      margin-left: 5vw
    }
  `