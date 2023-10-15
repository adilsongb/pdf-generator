import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DropZoneContainer, ThumbsContainer, Thumb, ThumbInner, ThumbImg } from './style';
import type { File } from './types';
import { Paragraph } from '@styles/Text';

function DropZone() {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = useMemo(() => files.map(file => (
    <Thumb key={file.name}>
      <ThumbInner>
        <ThumbImg
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </ThumbInner>
    </Thumb>
  )), [files])

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <DropZoneContainer {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Paragraph $Margin="20px">Adicione aqui as imagens do PDF</Paragraph>
      </DropZoneContainer>
      <ThumbsContainer>
        {thumbs}
      </ThumbsContainer>
    </section>
  );
}

export default DropZone;
