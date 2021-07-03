const express = require("express")
const morgan = require("morgan")
const pkg = require("../package.json")
const createRoles = require("./libs/initialSetup")
/////////////////Rutas/////////////////
const productsRoutes = require("./routes/products.routes")
const authRoutes = require("./routes/auth.routes")

const app = express()
//De esta forma pkg pasa a ser uan variable de la aplicacion
app.set("pkg", pkg)

createRoles()

//Middleware
app.use(morgan("dev"));
app.use(express.json())
//Express no entiende el json enviado por el servidor

app.get("/", (req, res) => {
	res.json({
		name: app.get("pkg").name,
		author: app.get("pkg").author,
		description: app.get("pkg").description,
		version: app.get("pkg").version
	})
})

app.use("/api/products", productsRoutes)
app.use("/api/auth", authRoutes)

module.exports = app;