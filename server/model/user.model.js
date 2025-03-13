import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  availableMoney: {
    type: Number,
    default: 100000
  },
  shoppingCartItems:{
    type: Array,
    default: []
  },
  purchasedItems: {
    type: Array,
    default: []
  }
})

export default mongoose.model("User", UserSchema)
