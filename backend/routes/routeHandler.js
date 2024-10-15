import express from "express";
import ShopingItem from "../model/shopingItem.model.js";
import verifyJWT from "../middlewires/verifyJWT.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const shopingItems = await ShopingItem.find();
    res.status(200).json({ success: true, data: shopingItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post("/", verifyJWT, async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const shopingItem = new ShopingItem({ name, price, image });
  try {
    await shopingItem.save();
    res.status(201).json({ success: true, message: "Item added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Please proide all fields" });
  }
});

router.put("/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    await ShopingItem.findByIdAndUpdate(
      id,
      { name, price, image },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Item updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.delete("/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const shopingItem = await ShopingItem.findByIdAndDelete(id);
    if (!shopingItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
