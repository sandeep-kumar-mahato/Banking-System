const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

mongoose
  .connect(
    "mongodb+srv://admin:bv4EUr0tGBYSXaCg@cluster0.uzxxto4.mongodb.net/customersDB?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, function () {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

const customersSchema = {
  Name: String,
  Email: String,
  Current_Balance: Number,
};

const Customer = mongoose.model("Customer", customersSchema);

const transactionSchema = {
  sender: String,
  receiver: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
};

const Transaction = mongoose.model("Transaction", transactionSchema);

app.use(bodyParser.urlencoded({ extended: true }));

// Index page
app.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.render("index", {
      customersList: customers,
    });
  } catch (err) {
    console.error(err);
  }
});

// Customers page
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.render("customers", {
      customersList: customers,
    });
  } catch (err) {
    console.error(err);
  }
});

// Payment page
app.get("/payment", async (req, res) => {
  try {
    const senderName = req.query.senderName;
    const customers = await Customer.find({});

    res.render("payment", {
      senderName: senderName,
      customersList: customers,
    });
  } catch (err) {
    console.error(err);
  }
});

// Process the payment
app.post("/process-payment", async (req, res) => {
  try {
    const senderName = req.body.sender;
    const receiverName = req.body.receiver;
    const amount = parseFloat(req.body.amount);

    const sender = await Customer.findOne({ Name: senderName });
    const receiver = await Customer.findOne({ Name: receiverName });

    if (!sender || !receiver) {
      throw new Error("Invalid sender or receiver");
    }

    if (sender.Current_Balance < amount) {
      throw new Error("Insufficient balance");
    }

    sender.Current_Balance -= amount;
    receiver.Current_Balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = new Transaction({
      sender: senderName,
      receiver: receiverName,
      amount: amount,
    });

    await transaction.save();

    res.redirect("/customers");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing payment");
  }
});

// Transactions page
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ timestamp: "desc" });
    res.render("transactions", {
      transactionsList: transactions,
    });
  } catch (err) {
    console.error(err);
  }
});
