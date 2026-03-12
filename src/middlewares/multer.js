import multer from 'multer';
import { TEMP_DIR } from '../constants/paths.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
