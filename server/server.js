require("dotenv").config()
const express = require("express")
const cors = require("cors")

require("./config/db")

const authRoutes = require("./routes/authRoutes")
const complaintRoutes = require("./routes/complaintRoutes")

const app = express()
const adminRoutes = require("./routes/adminRoutes")

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("uploads"))
app.use("/api/auth", authRoutes)
app.use("/api/complaints", complaintRoutes)

app.use("/api/admin", adminRoutes)

app.get("/", (req, res) => {
    res.send("Backend Running")
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})