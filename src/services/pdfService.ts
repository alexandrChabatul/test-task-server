import fetch from 'node-fetch';
import { PDFDocument } from 'pdf-lib';
import UserDto from '../dto/UserDto';

class PdfService {
  async generatePdf(userDto: UserDto) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([550, 750]);

    page.drawText(`${userDto.firstName}\n${userDto.lastName}`, {
      x: 50,
      y: 700,
      size: 20,
    });

    if (userDto.image) {
      const imageUrl = new URL(userDto.image);
      const image = await fetch(imageUrl);
      const imageBytes = await image.arrayBuffer();
      const pdfImage = await pdfDoc.embedPng(imageBytes);
      const sizes = pdfImage.scale(300 / pdfImage.width);
      page.drawImage(pdfImage, {
        x: 50,
        y: 550,
        width: sizes.width,
        height: sizes.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }
}

export default new PdfService();
