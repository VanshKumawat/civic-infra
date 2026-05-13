const express = require("express")
const db = require("../config/db")
const verifyToken = require("../middleware/authMiddleware")
const checkRole = require("../middleware/roleMiddleware")

const router = express.Router()

router.get("/users", verifyToken, checkRole(["admin"]), (req, res) => {
  const sql = "SELECT id, name, email, role, department FROM users"

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err)

    res.json(result)
  })
})

router.put("/users/role/:id", verifyToken, checkRole(["admin"]), (req, res) => {
  const { role, department } = req.body
  const { id } = req.params

  const sql = "UPDATE users SET role = ?, department = ? WHERE id = ?"

  db.query(sql, [role, department, id], (err) => {
    if (err) return res.status(500).json(err)

    res.json({ message: "User role updated" })
  })
})

module.exports = router