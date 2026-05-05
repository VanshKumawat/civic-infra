const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {

  const authHeader = req.headers["authorization"]
  console.log("AUTH HEADER:", authHeader)
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(403).json({ message: "No token provided" })
  }

  try {

    const decoded = jwt.verify(token, "SECRET_KEY")

    req.user = decoded

    next()

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

module.exports = verifyToken