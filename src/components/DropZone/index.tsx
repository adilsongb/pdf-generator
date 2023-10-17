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
import { Button, Loading } from '@styles/components';
import generatePDF from '@utils/generatorPDF';
import type { File } from 'types/dropzone';

function DropZone() {
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

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
    if (loading) return;

    setLoading(true)
    const pdfBlob = await generatePDF(files);
    
    setPdfBlob(pdfBlob);
    
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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

      {pdfBlob && !loading ? (
        <Button>
          <a href={pdfBlob} target='_blank' rel="noreferrer">
            Baixar PDF
          </a>
        </Button>
      ) : (
        <Button onClick={handleOnClick} disabled={!files.length}>
          {loading ? <Loading /> : 'Gerar PDF'}
        </Button>
      )}
    </section>
  );
}

export default DropZone;
