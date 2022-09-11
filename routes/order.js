const router = require("express").Router();
const Order = require("../modals/Order");
const { verifyToken, verifyAuth, verifyAdmin } = require("./verifyToken");

//Create

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE

router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedOrder = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Your Order has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//to get user order
router.get("/find/:id", verifyAuth, async (req, res) => {
  try {
    const orders = await Order.findById(req.params.id); //baad mai dekh lena
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Order

router.get("/", verifyAuth, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch {
    res.status(500).json(err);
  }
});

//Get Monthly Income

router.get("/income", verifyAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const PreviousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: PreviousMonth } },
      },
      {
        $project: { month: "$createdAt", sales: "$amount" },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
