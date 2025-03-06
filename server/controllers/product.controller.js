import Product from "../model/product.model.js"

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (err) {
    res.status(400).json({ error: err })
  }
}