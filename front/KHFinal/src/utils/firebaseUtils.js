import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from '../firebase';
import { v4 as uuidv4 } from 'uuid';
// ✅ Firebase에 유니크한 파일명으로 업로드 후 URL 반환
export const uploadImageToFirebase = async (
  file,
  folder = 'events',
  setUploadProgress
) => {
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
        console.log(`Upload is ${progress.toFixed(2)}% done`);
        if (setUploadProgress) {
          setUploadProgress(progress.toFixed(2)); // Format progress to two decimal places
        }
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

// ✅ Firebase에서 이미지 삭제
export const deleteImageFromFirebase = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const imagePath = extractPathFromUrl(imageUrl); // ✅ 올바른 경로 추출
    if (!imagePath) return;

    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    console.log(`✅ Firebase Storage에서 삭제됨: ${imagePath}`);
  } catch (error) {
    console.error(`❌ 이미지 삭제 실패: ${imageUrl}`, error);
  }
};

// ✅ Firebase Storage 이미지 경로 추출 함수
const extractPathFromUrl = (imageUrl) => {
  if (!imageUrl) return null;
  const match = imageUrl.match(/o\/(.+)\?/);
  return match ? decodeURIComponent(match[1]) : null; // ✅ URL 디코딩하여 경로 반환
};
