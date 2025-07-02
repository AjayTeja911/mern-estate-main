import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }
});

router.post('/', verifyToken, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;