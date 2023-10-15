import { PDFDocument } from 'pdf-lib';
import type { File } from 'types/dropzone';

const generatePDF = async (images: File[]) => {
  // Criar um novo documento PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([3508, 2480]);
  const { height } = page.getSize();

  // Incorporar as imagens no PDF
  for (const [index, image] of images.entries()) {
    const imageBytes = await image.arrayBuffer();
    const embeddedImage = await pdfDoc.embedJpg(imageBytes);
    const jpgDims = embeddedImage.scale(0.8);

    page.drawImage(embeddedImage, {
      x: (jpgDims.width * index) + 25,
      y: (height - jpgDims.height) / 2,
      width: jpgDims.width,
      height: jpgDims.height,
    });
  }

  // Salvar o PDF
  const pdfBytes = await pdfDoc.save();

  // Criar um objeto Blob a partir dos bytes do PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  // Criar uma URL de objeto para o Blob
  const pdfUrl = URL.createObjectURL(blob);

  return pdfUrl;
};

export default generatePDF;
