import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 5,
    min: [0, "Stock can't be lower than 0"]
  },
  rarity: {
    type: String,
  },
  hp: {
    type: Number
  },
  card_type: {
    type: String
  }
})

export default mongoose.model("Product", productSchema)