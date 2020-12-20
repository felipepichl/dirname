import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import File from '../models/File';

class FileController {
  async store(req, res) {
    const { filename: key } = req.file;

    /**
     * File resizing
     */
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', 'avatar', key));

    /**
     * Remove original file
     */
    fs.unlinkSync(req.file.path);

    const file = await File.create({
      key,
    });

    return res.json(file);
  }
}

export default new FileController();
