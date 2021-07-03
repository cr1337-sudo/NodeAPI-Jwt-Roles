const User = require("../models/User");
const jwt = require("jsonwebtoken")
const config = require("../config")
const Role = require("../models/Role")

const signUp = async (req, res) => {
	const { username, email, password, roles } = req.body;


	const newUser = new User({
		username,
		email,
		password: await User.encryptPassword(password)
	})
	if (roles) {
		const foundRoles = await Role.find({ name: { $in: roles } })
		newUser.roles = foundRoles.map(role => role.id)
	} else {
		const role = await Role.findOne({ name: "user" })
		newUser.roles = [role._id]
	}
	const savedUser = await newUser.save()
	console.log(savedUser.populate("roles"))

	const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
		expiresIn: 86400  //24 horas y expira
	})

	res.json({ token })
}

const signIn = async (req, res) => {
	const { email, password } = req.body;
	const userFound = await User.findOne({ email }).populate("roles");
	if (!userFound) {
		return res.json({ msj: "User not found" })
	}
	const matchPassword = await User.comparePassword(password, userFound.password)

	if (!matchPassword) {
		res.status(401).json({ token: null, message: "Invalid password" })
	}
	const token = jwt.sign({ id: userFound._id }, config.SECRET, {
		expiresIn: 86400
	})
	res.json({ token })
}

module.exports = { signUp, signIn }