import styled from 'styled-components';

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 5px solid #eaeaea;
  margin-bottom: 8;
  margin-right: 8;
  padding: 4;
  box-sizing: border-box;
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

export { ThumbsContainer, Thumb, ThumbInner, ThumbImg };
