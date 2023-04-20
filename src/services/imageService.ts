import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import ApiError from '../errors/ApiError';
import firebaseApp from '../firebase';

class ImageService {
  async saveImage(file: Express.Multer.File) {
    const storage = getStorage(firebaseApp);
    if (!file.mimetype.includes('image')) {
      return ApiError.BadRequest('Data should be an image.');
    }
    const fileNameParts = file.originalname.split('.');
    const storageRef = ref(
      storage,
      `files/${fileNameParts[0]}-${Date.now()}.${fileNameParts[1]}`
    );
    const metadata = {
      contentType: file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
}

export default new ImageService();
