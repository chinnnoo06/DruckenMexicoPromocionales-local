const { validationResult } = require("express-validator")
const deleteUploadedFiles = require("../helpers/deleteFiles")

const handleInputErrors = (req, res, next) => {

    let errors = validationResult(req)

    if (!errors.isEmpty()) {

        if (req.files) {
            deleteUploadedFiles(req.files);
        }
        
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

module.exports = handleInputErrors