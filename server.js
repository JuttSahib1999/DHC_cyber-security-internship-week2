const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const path = require('path');
const winston = require('winston');

const app = express();
const db = new sqlite3.Database('./database.db');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'security.log' })
  ]
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet()); // Secure HTTP headers

// Secret key (in real apps use environment variable)
const SECRET_KEY = "supersecretkey";

// Create table
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)");
});


// 🔹 SIGNUP (Secure Version)
app.post('/signup', async (req, res) => {
    let { email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).send("Invalid Email Format");
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
        return res.status(400).send("Weak Password");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prevent SQL Injection using parameterized query
    db.run(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword],
        function (err) {
            if (err) return res.send("User already exists");
            res.send("User Registered Securely");
        }
    );
});


// 🔹 LOGIN (Secure Version)
app.post('/login', async (req, res) => {
    let { email, password } = req.body;

    logger.info(`Login attempt for email: ${email}`);
    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, user) => {
            if (!user) {
                logger.warn(`Failed login attempt - user not found: ${email}`);
                return res.send("Invalid credentials");
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                logger.warn(`Failed login attempt - wrong password: ${email}`);
                return res.send("Invalid credentials");
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id }, SECRET_KEY, {
                expiresIn: "1h"
            });
logger.info(`Successful login for email: ${email}`);
            res.send({
                message: "Login successful",
                token: token
            });
        }
    );
});

app.listen(3000, () => {
    logger.info("Secure server started on http://localhost:3000");
});