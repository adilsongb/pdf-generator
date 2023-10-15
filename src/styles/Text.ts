import styled from 'styled-components';
import Colors from './Colors';
import type { Text } from './types';

const Title = styled.h1<Text>`
  margin: ${props => props.$Margin || 0};
  color: ${props => props.$Color || Colors.grayDark};
`;

const Paragraph = styled.p<Text>`
  margin: ${props => props.$Margin || 0};
  color: ${props => props.$Color || Colors.grayLight};
  font-weight: bold;
`;

export { Title, Paragraph };
