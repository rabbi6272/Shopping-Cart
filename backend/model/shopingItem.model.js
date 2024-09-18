import mongoose from "mongoose";

const shopingItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ShopingItem = mongoose.model("ShopingItem", shopingItemSchema);
export default ShopingItem;
