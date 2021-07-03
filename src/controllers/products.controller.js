const Product = require("../models/Product")

const createProduct = async (req, res) => {
	const { name, category, price, imgURL } = req.body
	const newProduct = new Product({ name, category, price, imgURL })
	const productSaved = await newProduct.save()

	res.status(201).json(productSaved)
}
const getProducts = async (req, res) => {
	const products = await Product.find() //Devuelve todos los productos, find es como objects.all() en django
	res.json(products)
}
const getProductById = async (req, res) => {
	const { productId } = req.params;
	const product = await Product.findById(productId)
	res.status(200).json(product)

}
const updateProductById = async (req, res) => {
	const { productId } = req.params;
	const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true }) //almacena ne la variable el producto con los datos nuevos
	res.status(200).json(updatedProduct)

}
const deleteProductById = async (req, res) => {
	const { productId } = req.params;
	const deletedProduct = await Product.findByIdAndDelete(productId)
	res.status(204).json({
		"isOk": true
	})

}

module.exports = { createProduct, getProducts, getProductById, updateProductById, deleteProductById }