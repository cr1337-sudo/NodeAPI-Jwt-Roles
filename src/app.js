const express = require("express")
const app = express()
const morgan = require("morgan")
const pkg = require("../package.json")

/////////////////Rutas/////////////////
const productsRoutes = require("./routes/products.routes")

//De esta forma pkg pasa a ser uan variable de la aplicacion
app.set("pkg", pkg)

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

app.use("/products", productsRoutes)

module.exports = app;