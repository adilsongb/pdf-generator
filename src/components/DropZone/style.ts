import Colors from '@styles/Colors';
import styled from 'styled-components';

const DropZoneContainer = styled.aside`
  border: 2px dashed ${Colors.grayLight};
  cursor: pointer;
  text-align: center;
  margin: 10px 0;
  border-radius: 5px;
  height: 240px;
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 2px solid ${Colors.grayLight};
  margin: 8px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const ThumbImg = styled.img`
  display: block;
  width: 100px;
  height: 100%;
`;

export { DropZoneContainer, ThumbsContainer, Thumb, ThumbInner, ThumbImg };
