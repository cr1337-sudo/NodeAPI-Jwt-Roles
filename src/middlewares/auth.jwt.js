const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User")
const Role = require("../models/Role")

const verifyToken = async (req, res, next) => {
   try {

      const token = req.headers["x-access-token"];

      if (!token) return res.status(401).json({ message: "No token provided" })

      const decoded = jwt.verify(token, config.SECRET)

      req.userId = decoded.id;

      const user = await User.findById(req.userId, { password: 0 }).populate("roles")

      if (!user) return res.status(404).json({ message: "No user found" })
      next();
   } catch (error) {
      res.json({ message: "No autorized" })
   }

}

const isModerator = async (req, res, next) => {
   const user = await User.findById(req.userId)
   const roles = await Role.find({ _id: { $in: user.roles } }) //Busca aquel rol en el que el/los id este incluido en user.roles
   console.log(roles)
   for (const role of roles) {
      if (role.name === "moderator")
         next();
      return;
   }
   return res.status(403).json({ message: "Required moderator role" })
}

const isAdmin = async (req, res, next) => {
   const user = await User.findById(req.userId)
   const roles = await Role.find({ _id: { $in: user.roles } }) //Busca aquel rol en el que el/los id este incluido en user.roles
   console.log(roles)
   for (const role of roles) {
      if (role.name === "admin")
         next();
      return;
   }
   return res.status(403).json({ message: "Required Admin role" })

}

module.exports = { verifyToken, isModerator, isAdmin }