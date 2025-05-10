import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const storage = multer.diskStorage({
    destination:"Uploads",
    filename: function (req, file, cb) {
      const fn = crypto.randomBytes(12).toString('hex') + path.extname(file.originalname)
        cb(null, fn)
    }
  })
  
  const Upload = multer({ storage: storage })

  export { Upload };