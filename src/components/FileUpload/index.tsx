import React from 'react';
import { Container } from './style';
import { Title } from '@styles/Text';
import Previews from '@components/DropZone';

function FileUpload() {
  return (
    <Container>
      <Title>Gerador de PDF</Title>
      <Previews />
    </Container>
  );
}

export default FileUpload;
