import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ThumbsContainer, Thumb, ThumbInner, ThumbImg } from './style';
import type { File } from './types';

function Previews() {
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
  
  const thumbs = files.map(file => (
    <Thumb key={file.name}>
      <ThumbInner>
        <ThumbImg
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </ThumbInner>
    </Thumb>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Adicione aqui as imagens do PDF</p>
      </div>
      <ThumbsContainer>
        {thumbs}
      </ThumbsContainer>
    </section>
  );
}

export default Previews;
