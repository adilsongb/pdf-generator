import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  DropZoneContainer,
  ThumbsContainer,
  Thumb,
  ThumbInner,
  ThumbImg,
} from './style';
import { Paragraph } from '@styles/Text';
import generatePDF from '@utils/generatorPDF';
import type { File } from 'types/dropzone';

function DropZone() {
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(prevFiles => {
        const newFiles = acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))

        return [...prevFiles, ...newFiles]
      });
    }
  });

  async function handleOnClick() {
    const pdfBlob = await generatePDF(files);
    
    setPdfBlob(pdfBlob);
  }

  const thumbs = useMemo(() => files.map(file => (
    <Thumb key={file.name}>
      <ThumbInner>
        <ThumbImg
          src={file.preview}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </ThumbInner>
    </Thumb>
  )), [files])

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <DropZoneContainer {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {!thumbs.length && (<Paragraph $Margin="20px">Adicione aqui as imagens do PDF</Paragraph>)}

        <ThumbsContainer>
          {thumbs}
        </ThumbsContainer>
      </DropZoneContainer>
      <button onClick={handleOnClick}>
        Gerar PDF
      </button>

      {pdfBlob && (
        <div>
          <h2>PDF Gerado:</h2>
          <a href={pdfBlob} target='_blank' rel="noreferrer">
            Baixar PDF
          </a>
        </div>
      )}
    </section>
  );
}

export default DropZone;
