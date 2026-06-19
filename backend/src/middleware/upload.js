import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage configuration — save to local disk temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter — accept videos and images
const fileFilter = (req, file, cb) => {
  const videoTypes = /mp4|webm|mov|avi|mkv/;
  const imageTypes = /jpeg|jpg|png|gif|webp|svg/;

  const extName = path.extname(file.originalname).toLowerCase().slice(1);
  const mimeVideo = file.mimetype.startsWith('video/');
  const mimeImage = file.mimetype.startsWith('image/');

  if ((videoTypes.test(extName) && mimeVideo) || (imageTypes.test(extName) && mimeImage)) {
    cb(null, true);
  } else {
    cb(new Error('Only video files (mp4, webm, mov, avi, mkv) and image files (jpeg, jpg, png, gif, webp) are allowed.'), false);
  }
};

// Multer instance with 100MB limit
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

export default upload;
