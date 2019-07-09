import File from '../models/File';

class FileController {
  async store(req, res) {
    if (!req.file) return res.status(422).json({error: 'Validation failed'});
    const {originalname: name, filename: path} = req.file;

    const file = await File.create({name, path});

    return res.json(file);
  }
}

export default new FileController();
