import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1573689705887-bc0763c82ea2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80') #000;
  background-size: cover;
  overflow: hidden;
`

export const StyledTetris = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  margin: 0;
  max-width: 50%;

    aside {
      width: 100%;
      max-width: 200px;
      display: block;
      padding: 0 20px;
      ${'' /* margin-left: 5vw */}
    }
  `