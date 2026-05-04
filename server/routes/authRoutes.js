const express = require("express")
const bcrypt = require("bcryptjs")

const db = require("../config/db")

const router = express.Router()
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body

    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        const sql = `
            INSERT INTO users(name, email, password)
            VALUES (?, ?, ?)
        `

        db.query(
            sql,
            [name, email, hashedPassword],
            (err, result) => {

                if(err){
                    return res.status(500).json(err)
                }

                res.json({
                    message: "User Registered Successfully"
                })

            }
        )

    }
    catch(error){
        res.status(500).json(error)
    }

})

router.post("/login", (req, res) => {

    const { email, password } = req.body

    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `

    db.query(sql, [email], async (err, result) => {

        if(err){
            return res.status(500).json(err)
        }

        if(result.length === 0){
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        const user = result[0]

        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            "SECRET_KEY",
            {
                expiresIn: "1d"
            }
        )

        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    })

})

module.exports = router