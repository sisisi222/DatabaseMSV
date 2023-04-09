// // Import required libraries
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const pool = require("./dmbs");

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes

// // User sign up
// app.post("/signup", async (req, res) => {
//   const { username, password, type } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await pool.query(
//       "SELECT * FROM login WHERE username = $1",
//       [username]
//     );

//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({ message: "Username already taken" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Insert new user into login table
//     const newUser = await pool.query(
//       "INSERT INTO login (username, password, type) VALUES ($1, $2, $3) RETURNING id",
//       [username, hashedPassword, userType]
//     );

      

//     // Determine user type and insert into appropriate table
//     const userId = newUser.rows[0].id;

//     if (type === "customer") {
//       const newCustomer = await pool.query(
//         "INSERT INTO customer (cid) VALUES ($1)",
//         [userId]
//       );
//     } else if (type === "employee") {
//       const newEmployee = await pool.query(
//         "INSERT INTO employee (sid) VALUES ($1)",
//         [userId]
//       );
//     } else {
//       return res.status(400).json({ message: "Invalid user type" });
//     }

//     res.json({ message: "User created successfully" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Error creating user" });
//   }
// });

// // Start the server
// app.listen(5500, () => {
//   console.log("Server started on port 5500");
// });