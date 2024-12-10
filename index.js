const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 4000;

// Middlewares
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin123",
    database: "shop_be"
});

db.connect(err => {
    if (err) {
        console.log("Error connecting to MySQL");
    } else {
        console.log("Now connected to MySQL");
    }
});

// Add a new product
app.post("/product", (req, res) => {
    const { name, price, desc, stocks } = req.body;
    const sql = "INSERT INTO product (name, price, `desc`, stocks) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, price, desc, stocks], (err, result) => {
        if (err) {
            res.send("Error adding product");
        } else {
            res.send("Product added successfully!");
        }
    });
});

// Get all products
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, result) => {
        if (err) {
            res.send("Error getting products");
        } else {
            res.json(result);
        }
    });
});

// Get a product by ID
app.get("/product/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM product WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err || result.length === 0) {
            res.send("Product not found");
        } else {
            res.json(result);
        }
    });
});

// Update a product
app.put("/product/:id", (req, res) => {
    const { id } = req.params;
    const { name, price, desc, stocks } = req.body;
    const sql = "UPDATE product SET name = ?, price = ?, `desc` = ?, stocks = ? WHERE id = ?";
    db.query(sql, [name, price, desc, stocks, id], (err, result) => {
        if (err) {
            res.send("Error updating product");
        } else if (result.affectedRows === 0) {
            res.send("Product not found");
        } else {
            res.send("Product updated successfully");
        }
    });
});

// Delete a product
app.delete("/product/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM product WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.send("Error deleting product");
        } else if (result.affectedRows === 0) {
            res.send("Product not found");
        } else {
            res.send("Product deleted successfully");
        }
    });
});

// Create a new customer
app.post("/customer", (req, res) => {
    const { name, email, address, phone } = req.body;
    const sql = "INSERT INTO customer (name, email, address, phone) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, address, phone], (err, result) => {
        if (err) {
            res.send("Error adding customer");
        } else {
            res.send("Customer added successfully!");
        }
    });
});

// Get all customers
app.get("/customers", (req, res) => {
    const sql = "SELECT * FROM customer";
    db.query(sql, (err, result) => {
        if (err) {
            res.send("Error getting customers");
        } else {
            res.json(result);
        }
    });
});

// Get a customer by ID
app.get("/customer/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM customer WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err || result.length === 0) {
            res.send("Customer not found");
        } else {
            res.json(result);
        }
    });
});

// Update a customer
app.put("/customer/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, address, phone } = req.body;
    const sql = "UPDATE customer SET name = ?, email = ?, address = ?, phone = ? WHERE id = ?";
    db.query(sql, [name, email, address, phone, id], (err, result) => {
        if (err) {
            res.send("Error updating customer");
        } else if (result.affectedRows === 0) {
            res.send("Customer not found");
        } else {
            res.send("Customer updated successfully");
        }
    });
});

// Delete a customer
app.delete("/customer/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM customer WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.send("Error deleting customer");
        } else if (result.affectedRows === 0) {
            res.send("Customer not found");
        } else {
            res.send("Customer deleted successfully");
        }
    });
});

// Create a new order
app.post("/order", (req, res) => {
    const { customer_id, product_id, quantity, total_price, status } = req.body;
    const sql = "INSERT INTO orders (customer_id, product_id, quantity, total_price, status) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [customer_id, product_id, quantity, total_price, status], (err, result) => {
        if (err) {
            res.send("Error adding order");
        } else {
            res.send("Order added successfully!");
        }
    });
});

// Get all orders
app.get("/orders", (req, res) => {
    const sql = "SELECT * FROM orders";
    db.query(sql, (err, result) => {
        if (err) {
            res.send("Error getting orders");
        } else {
            res.json(result);
        }
    });
});

// Get an order by ID
app.get("/order/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM orders WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err || result.length === 0) {
            res.send("Order not found");
        } else {
            res.json(result);
        }
    });
});

// Update an order
app.put("/order/:id", (req, res) => {
    const { id } = req.params;
    const { customer_id, product_id, quantity, total_price, status } = req.body;
    const sql = "UPDATE orders SET customer_id = ?, product_id = ?, quantity = ?, total_price = ?, status = ? WHERE id = ?";
    db.query(sql, [customer_id, product_id, quantity, total_price, status, id], (err, result) => {
        if (err) {
            res.send("Error updating order");
        } else if (result.affectedRows === 0) {
            res.send("Order not found");
        } else {
            res.send("Order updated successfully");
        }
    });
});

// Delete an order
app.delete("/order/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM orders WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.send("Error deleting order");
        } else if (result.affectedRows === 0) {
            res.send("Order not found");
        } else {
            res.send("Order deleted successfully");
        }
    });
});

app.listen(port, () => console.log("Server is running at port " + port));