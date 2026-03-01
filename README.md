# 🔐 Cyber Security Internship – Week 2
## Secured Web Application (Security Implementation Phase)

---

## 📌 Project Overview

This project represents Week 2 of my Cybersecurity Internship.

In this phase, all vulnerabilities identified in Week 1 were mitigated by implementing secure coding practices and authentication mechanisms.

The application was transformed from a vulnerable system into a secured web application.

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- SQLite
- bcrypt (Password Hashing)
- JSON Web Token (JWT)
- Helmet (Security Headers)
- Validator
- Winston (Security Logging)

---

## 🚀 How to Run the Project

1. Install dependencies:


npm install


2. Start the server:


node server.js


3. Open browser:


http://localhost:3000


---

## 🔒 Security Enhancements Implemented

### ✅ 1️⃣ SQL Injection Prevention
- Parameterized queries implemented
- Eliminated authentication bypass risk

---

### ✅ 2️⃣ Secure Password Storage
- Passwords hashed using bcrypt
- No plain text storage

---

### ✅ 3️⃣ Input Validation
- Email format validation
- Strong password enforcement
- Missing field checks

---

### ✅ 4️⃣ JWT Authentication
- Token generated after login
- 1-hour expiration
- Protected routes (Create, List, Delete)

---

### ✅ 5️⃣ Security Headers (Helmet)
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- HSTS

---

### ✅ 6️⃣ Security Logging
- Login attempts logged
- Failed authentication tracked
- Logs stored in `security.log`

---

## 📊 Security Comparison

| Feature | Week 1 | Week 2 |
|----------|--------|--------|
| SQL Injection | Vulnerable | Fixed |
| Password Storage | Plain Text | Hashed |
| Authentication | Basic | JWT-Based |
| Security Headers | Missing | Implemented |
| Logging | Not Available | Enabled |

---

## 🎯 Learning Outcomes

Through this implementation, I gained hands-on experience in:

- Secure coding practices
- Authentication mechanisms
- HTTP security hardening
- Vulnerability remediation
- Security monitoring

---

## 📁 Internship Context

This repository represents **Week 2 – Security Implementation Phase** of my Cybersecurity Internship.

The application now follows fundamental web security best practices and demonstrates real-world vulnerability remediation.
