import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '../firebase';
import { v4 as uuidv4 } from 'uuid';
// ✅ Firebase에 유니크한 파일명으로 업로드 후 URL 반환
export const uploadImageToFirebase = async (file, folder = 'events') => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No file provided');
      return;
    }

    const uniqueFileName = `${uuidv4()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};
