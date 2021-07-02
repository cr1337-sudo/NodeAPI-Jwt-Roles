const { Schema, model } = require("mongoose");

const productSchema = new Schema({
        name: String,
        category: String,
        price: Number,
        imgURL: String,
},{
        timestamps: true,
        versionKey: false
})

module.exports = model("Product", productSchema)