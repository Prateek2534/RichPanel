const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/userModel");
const Plan = require("../models/planModel");

router.get("/", async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
  const plans = await Plan.find();
  res.render("planSelection", { plans });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/payments", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    res.render("payments");
});

router.post("/login", async (req, res) => {
  const { loginEmail, loginPassword } = req.body;
  const user = await User.findOne({ email:loginEmail, password:loginPassword });

  if (user) {
    req.session.userId = user._id;
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    const newUser = new User({ name, email, password });
    await newUser.save();
  
    res.status(201).json({ message: 'Registration successful' });
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const user = await User.findById(req.session.userId).populate("plan");

  res.render("dashboard", { user });
});

router.post("/subscribe/:planId", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const user = await User.findById(req.session.userId);
  const plan = await Plan.findById(req.params.planId);

  // Create a Stripe session for payment
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: plan.planName,
          },
          unit_amount: plan.monthlyPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/success?userId=${user._id}`,
    cancel_url: "http://localhost:3000/cancel",
  });

  res.redirect(session.url);
});

router.get("/success", async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.redirect("/");
  }

  const user = await User.findById(userId);
  await user.save();

  res.redirect("/dashboard");
});

router.get("/cancel", (req, res) => {
  res.redirect("/dashboard");
});

module.exports = router;
