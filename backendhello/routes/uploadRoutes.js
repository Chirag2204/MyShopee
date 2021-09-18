import express from 'express'
import path from 'path'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/
    const extensionName = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extensionName) {
        return cb(null, true)
    } else {
        return cb('Upload Images Only')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router