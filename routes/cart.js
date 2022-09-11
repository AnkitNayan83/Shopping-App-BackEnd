const router = require("express").Router();
const Cart = require("../modals/Cart");
const { verifyToken, verifyAuth, verifyAdmin } = require("./verifyToken");

//Add to cart

router.post("/", verifyToken, async (req, res) => {
  const newCartProduct = new Cart(req.body);
  try {
    const savedCartProduct = await newCartProduct.save();
    res.status(200).json(savedCartProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE

router.put("/:id", verifyAuth, async (req, res) => {
  try {
    const updatedCartProduct = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCartProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Your Cart has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//to get user Cart
router.get("/find/:id", verifyAuth, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id); //baad mai dekh lena
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All

router.get("/", verifyAdmin, async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
