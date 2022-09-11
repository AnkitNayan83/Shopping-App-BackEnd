const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./db");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const stripeRoutes = require("./routes/stripe");

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", stripeRoutes);

app.use(express.static(path.join(__dirname, "/zepp/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/zepp/build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Backend Server is running on port 8080");
});
