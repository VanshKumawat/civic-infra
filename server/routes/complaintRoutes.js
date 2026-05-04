const express = require("express")

const db = require("../config/db")

const upload = require("../middleware/upload")

const router = express.Router()

router.post(
    "/create",
    upload.single("image"),
    (req, res) => {

        const {
            title,
            category,
            description,
            location
        } = req.body

        const image = req.file.filename

        const sql = `
            INSERT INTO complaints
            (
                title,
                category,
                description,
                location,
                image
            )
            VALUES (?, ?, ?, ?, ?)
        `

        db.query(
            sql,
            [
                title,
                category,
                description,
                location,
                image
            ],
            (err, result) => {

                if(err){
                    return res.status(500).json(err)
                }

                res.json({
                    message: "Complaint Submitted"
                })

            }
        )

    }
)

module.exports = router