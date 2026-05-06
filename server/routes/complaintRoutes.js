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

    
    console.log("BODY:", req.body)       
    console.log("FILE:", req.file)       
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
  "/update-status/:id",
  verifyToken,
  checkRole(["officer", "admin"]),
  (req, res) => {

    if (req.user.role !== "officer" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" })
    }
    
    const { id } = req.params
    const { status } = req.body

    const sql = `UPDATE complaints SET status = ? WHERE id = ?`

    db.query(sql, [status, id], (err, result) => {

      if (err) {
        return res.status(500).json(err)
      }

      res.json({ message: "Status Updated" })

    })

  }
)

router.put(
  "/upload-proof/:id",
  verifyToken,
  checkRole(["officer", "admin"]),
  upload.single("proof"),
  (req, res) => {

    if (req.user.role !== "officer" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" })
    }

    const { id } = req.params
    const { status } = req.body

    if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" })
    }
    
    const proofFilename = req.file.filename
    console.log("Updating:", id, status)

    const sql = `
      UPDATE complaints
      SET proof_image = ?, status = 'Resolved'
      WHERE id = ?
    `

     db.query(sql, [proofFilename, id], (err, result) => {

      if (err) {
        console.log(err)
        return res.status(500).json(err)
      }

      res.json({ message: "Proof Uploaded" })

    })

  }
)

router.get("/stats", verifyToken, (req, res) => {

  const user = req.user

  let sql = ""
  let values = []

  if (user.role === "officer" || user.role === "admin") {
 // Officer/Admin → all complaints
    sql = `
      SELECT 
        COUNT(*) AS total,
        SUM(status = 'Pending') AS pending,
        SUM(status = 'In Progress') AS inProgress,
        SUM(status = 'Resolved') AS resolved
      FROM complaints
    `

  } else {
 // Normal user → only their complaints
    sql =  `
      SELECT 
        COUNT(*) AS total,
        SUM(LOWER(status) = 'pending') AS pending,
        SUM(LOWER(status) = 'in progress') AS inProgress,
        SUM(LOWER(status) = 'resolved') AS resolved
      FROM complaints
      WHERE user_id = ?
    `

    values = [user.id]
  }

  db.query(sql, values, (err, result) => {

    if (err) {
      return res.status(500).json(err)
    }

    res.json(result[0])

  })

})

module.exports = router