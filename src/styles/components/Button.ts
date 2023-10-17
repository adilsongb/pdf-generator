import styled from 'styled-components';
import Colors from '../Colors';

const Button = styled.button`
  width: 100%;
  height: 40px;
  cursor: pointer;
  padding: 10px;
  background-color: ${Colors.blueLight};
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  
  a {
    text-decoration: none;
    color: white;
  }

  &:disabled {
    color: ${Colors.grayWhite};
    background-color: ${Colors.grayLight};
    cursor: not-allowed;
  }
`;

export { Button };
