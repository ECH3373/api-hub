import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { randomBytes } from 'crypto';
import { config } from '../../config/index.js';

export const store = async (req, res) => {
  const upload = multer({ dest: config.storage }).single('file');

  upload(req, res, async (err) => {
    try {
      if (err) return res.status(400).json({ status: 'error', message: err.message });
      if (!req.file) return res.status(400).json({ status: 'error', message: 'no file provided' });

      const extension = path.extname(req.file.originalname);
      const name = randomBytes(32).toString('hex');
      const fileName = `${name}${extension}`;

      const directory = `${config.storage}${fileName}`;
      fs.renameSync(req.file.path, directory);
      const domain = `${req.protocol}://${req.get('host')}/`;
      const url = `${domain}${config.storage}${fileName}`;

      const data = {
        url,
      };

      return res.status(200).json({ status: 'success', message: 'file storaged successfully', data });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error });
    }
  });
};

// ****************************************************************************************************

export const controller = {
  store,
};
