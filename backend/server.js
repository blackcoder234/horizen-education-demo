// server.js

const express = require("express");
const path = require("path");

const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;


// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
const staticPath = path.join(__dirname, "./frontend");
app.use(express.static(staticPath));





// Routes to serve HTML files
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading index.html");
        }
    });
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading Page");
        }
    });
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(staticPath, "about.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading Page");
        }
    });
});

app.get("/service", (req, res) => {
    res.sendFile(path.join(staticPath, "service.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading Page");
        }
    });
});

app.get("/work", (req, res) => {
    res.sendFile(path.join(staticPath, "work.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading Page");
        }
    });
});

app.get("/team", (req, res) => {
    res.sendFile(path.join(staticPath, "team.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading Page");
        }
    });
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(staticPath, "contact.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading Page");
        }
    });
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading Page");
        }
    });
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading Page");
        }
    });
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(staticPath, "admin.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading Page");
        }
    });
});

// 404 Route
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(staticPath, "404.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading 404.html");
        }
    });
});

// Centralized Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({ success: false, message: "Form tampered with" });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is active on port ${port}`);
    console.log(`Visit this link--- http://localhost:${port}`);
});
