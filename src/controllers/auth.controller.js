const User = require("../models/User");
const jwt = require("jsonwebtoken")
const config = require("../config")

const signUp = async (req, res) => {
	const { username, email, password, roles } = req.body;


	const newUser = new User({
		username,
		email,
		password: await User.encryptPassword(password),
	})
	if(roles){
		await Role.fin({name: {$in: roles}})
	}
	const savedUser = await newUser.save()

	const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
		expiresIn: 86400  //24 horas y expira
	})

	res.json({ token })
}

const signIn = async (req, res) => {
	res.json("Sign In")
}

module.exports = { signUp, signIn }