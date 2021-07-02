const Products = require("../models/Product")

const createProduct = (req, res) => {
        console.log(req.body)
        res.json({
                "ola":"hola"
        })
}
const getProducts = (req, res) => {
        res.send("get products")
}
const getProductById = (req, res) => {

}
const updateProductById = (req, res) => {
}
const deleteProductById = (req, res) => {


}

module.exports = { createProduct, getProducts, getProductById, updateProductById, deleteProductById }