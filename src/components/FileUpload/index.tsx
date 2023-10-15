import React from 'react';
import { Container } from './style';
import { Title } from '@styles/Text';
import DropZone from '@components/DropZone';

function FileUpload() {
  return (
    <Container>
      <Title style={{ textAlign: 'center' }}>Gerador de PDF</Title>
      <DropZone />
    </Container>
  );
}

export default FileUpload;
