const express = require("express")
const app = require("./app")
const db = require("./database")



app.listen(3000, () => {
        console.log("App corriendo en puerto 3000")
})