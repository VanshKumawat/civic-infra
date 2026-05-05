const express = require("express")

const db = require("../config/db")

const upload = require("../middleware/upload")

const router = express.Router()

const verifyToken = require("../middleware/authMiddleware")
const checkRole = require("../middleware/roleMiddleware")



router.post(
    "/create",
    verifyToken,
    upload.single("image"),
    (req, res) => {

       console.log("BODY:", req.body)       // ← add this
    console.log("FILE:", req.file)       // ← add this
    console.log("USER:", req.user)  
    
        const {
            title,
            category,
            description,
            location
        } = req.body
        const user_id = req.user.id
        const image = req.file ? req.file.filename : null

        const sql = `
            INSERT INTO complaints
            (
                title,
                category,
                description,
                location,
                image,
                user_id
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `

        db.query(
            sql,
            [
                title,
                category,
                description,
                location,
                image,
                user_id
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

router.get("/", verifyToken, (req, res) => {

  console.log("USER FROM TOKEN:", req.user) 
  const user = req.user

  let sql = ""
  let values = []

  if (user.role === "officer" || user.role === "admin") {

    // officer sees all
    sql = "SELECT * FROM complaints ORDER BY id DESC"

  } else {

    // normal user sees only their complaints
    sql = "SELECT * FROM complaints WHERE user_id = ? ORDER BY id DESC"
    values = [user.id]

  }

  db.query(sql, values, (err, result) => {

    if (err) {
      return res.status(500).json(err)
    }

    res.json(result)

  })

})

router.put(
  "/upload-proof/:id",
  verifyToken,
  checkRole(["officer", "admin"]),
  upload.single("proof"),
  (req, res) => {

    const { id } = req.params
    const proofImage = req.file.filename

    const sql = `
      UPDATE complaints
      SET proof_image = ?, status = 'Resolved'
      WHERE id = ?
    `

    db.query(sql, [proofImage, id], (err, result) => {

      if (err) {
        return res.status(500).json(err)
      }

      res.json({ message: "Proof Uploaded" })

    })

  }
)

module.exports = router